require('dotenv/config');
const express = require('express');

const db = require('./database');
const ClientError = require('./client-error');
const staticMiddleware = require('./static-middleware');
const sessionMiddleware = require('./session-middleware');

const app = express();

app.use(staticMiddleware);
app.use(sessionMiddleware);

app.use(express.json());

app.get('/api/health-check', (req, res, next) => {
  db.query('select \'successfully connected\' as "message"')
    .then(result => res.json(result.rows[0]))
    .catch(err => next(err));
});

app.get('/api/products/', (req, res, next) => {
  const sql = `
    select "productId",
            "name",
            "price",
            "image",
            "shortDescription"
      from "products"
  `;
  db.query(sql)
    .then(result => {
      res.json(result.rows);
    }).catch(err => next(err));
});

app.get('/api/products/:productId', (req, res, next) => {
  const productId = req.params.productId;
  const text = `
    select *
      from "products"
      where "productId" = $1
  `;
  const values = [productId];
  if (productId < 0) {
    res.status(400).json({
      error: 'Invalid productId'
    });
    return;
  }
  db.query(text, values)
    .then(result => {
      const product1 = result.rows[0];
      if (!product1) {
        res.status(404).json({
          error: `Product ID ${productId} not found`
        });
      } else {
        return res.json(product1);
      }
    })
    .catch(err => {
      console.error(err);
      res.status(500).json({
        error: 'An unexpected error occurred.'
      });
    });
});

app.get('/api/cart/', (req, res, next) => {
  if (!req.session.cartId) {
    res.json([]);
  } else {
    const sql = `select "c"."cartItemId",
      "c"."price",
      "c"."quantity",
      "p"."productId",
      "p"."image",
      "p"."name",
      "p"."shortDescription"
      from "cartItems" as "c"
      join "products" as "p" using ("productId")
      where "c"."cartId" = $1`;
    const values = [req.session.cartId];
    return db.query(sql, values)
      .then(result => {
        const cartItem = result.rows;
        return res.json(cartItem);
      });
  }
});

app.post('/api/cart/', (req, res, next) => {
  const productId = req.body.productId;
  if (productId < 0) {
    res.status(400).json({
      error: 'Invalid productId'
    });
    return;
  }
  const text = `
    select "price"
    from "products"
    where "productId" = $1
    `;
  const values = [productId];
  db.query(text, values)
    .then(result => {
      const productRows = result.rows;
      if (productRows.length === 0) {
        throw new ClientError('No data to return', 400);
      } const price = result.rows[0].price;
      if (!req.session.cartId) {
        const sql = `insert into "carts" ("cartId", "createdAt")
        values (default, default)
        returning "cartId"`;
        return db.query(sql)
          .then(result => {
            const cartId = result.rows[0].cartId;
            return { cartId, price };
          });
      } else {
        return { cartId: req.session.cartId, price };
      }
    })
    .then(result => {
      req.session.cartId = result.cartId;
      const sql = `insert into "cartItems" ("cartId", "productId", "price", "quantity")
      values ($1, $2, $3, $4)
      ON CONFLICT ("cartId", "productId") DO UPDATE
      SET "quantity" = "cartItems"."quantity" + 1
      returning "cartItemId"`;
      const values = [result.cartId, productId, result.price, 1];
      return db.query(sql, values)
        .then(result => {
          const cartItemId = result.rows[0].cartItemId;
          return cartItemId;
        });
    }
    ).then(result => {
      const sql = `select "c"."cartItemId",
      "c"."price",
      "c"."quantity",
      "p"."productId",
      "p"."image",
      "p"."name",
      "p"."shortDescription"
      from "cartItems" as "c"
      join "products" as "p" using ("productId")
      where "c"."cartItemId" = $1`;
      const values = [result];
      return db.query(sql, values)
        .then(result => {
          const cartItem = result.rows[0];
          return res.status(201).json(cartItem);
        });
    })
    .catch(err => {
      console.error(err);
      res.status(500).json({
        error: 'An unexpected error occurred.'
      });
    });
});

app.delete('/api/cart/', (req, res, next) => {
  const itemId = req.body.cartItemId;
  if (!itemId || !Number(itemId)) {
    throw new ClientError('Cart item id required', 400);
  } else if (itemId <= 0) {
    throw new ClientError(`Cart item id ${itemId} is invalid`, 400);
  } const sql = `delete from "cartItems"
        where "cartItemId" = $1 and "cartId" = $2`;
  const values = [itemId, req.session.cartId];
  db.query(sql, values)
    .then(result => {
      if (result.rowCount === 0) {
        throw new ClientError(`Cart item id ${itemId} is invalid`, 400);
      } res.sendStatus(204);
    })
    .catch(err => next(err));
});

app.post('/api/orders/', (req, res, next) => {
  const cartId = req.session.cartId;
  const name = req.body.name;
  const creditCard = req.body.creditCard;
  const shippingAddress = req.body.shippingAddress;
  const quantity = req.body.quantity;
  if (!req.session.cartId) {
    res.status(400).json({
      error: `Product ID ${cartId} not found`
    });
    return;
  }
  if (!name || !creditCard || !shippingAddress) {
    res.status(400).json({
      error: 'Insert name, creditCard, and shippingAddress'
    });
    return;
  }
  const text = `insert into "orders" ("cartId", "name", "creditCard", "shippingAddress", "quantity")
   values($1, $2, $3, $4, $5)
   returning *
   `;
  const values = [cartId, name, creditCard, shippingAddress, quantity];
  db.query(text, values)
    .then(result => {
      delete req.session.cartId;
      const order = result.rows[0];
      res.status(201).json(order);
    })
    .catch(err => {
      console.error(err);
      res.status(500).json({
        error: 'An unexpected error occurred.'
      });
    });
});

app.use('/api', (req, res, next) => {
  next(new ClientError(`cannot ${req.method} ${req.originalUrl}`, 404));
});

app.use((err, req, res, next) => {
  if (err instanceof ClientError) {
    res.status(err.status).json({ error: err.message });
  } else {
    console.error(err);
    res.status(500).json({
      error: 'an unexpected error occurred'
    });
  }
});

app.listen(process.env.PORT, () => {
  // eslint-disable-next-line no-console
  console.log('Listening on port', process.env.PORT);
});
