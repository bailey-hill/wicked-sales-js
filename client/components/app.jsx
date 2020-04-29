import React from 'react';
import Header from './header';
import ProductList from './product-list';
import ProductDetails from './product-details';
import CartSummary from './cart-summary';
import CheckoutForm from './checkout-form';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      view: {
        name: 'catalog',
        params: {}
      },
      cart: []
    };
    this.setView = this.setView.bind(this);
    this.getCartItems = this.getCartItems.bind(this);
    this.cartItemCount = this.cartItemCount.bind(this);
    this.addToCart = this.addToCart.bind(this);
    this.totalPrice = this.totalPrice.bind(this);
    this.placeOrder = this.placeOrder.bind(this);
  }

  componentDidMount() {
    this.getCartItems();
  }

  setView(name, params) {
    this.setState({
      view: {
        name: name,
        params
      }
    });
  }

  getCartItems() {
    fetch('/api/cart/')
      .then(response => response.json())
      .then(data => {
        return this.setState({ cart: data });
      });
  }

  cartItemCount() {
    const length = this.state.cart.length;
    return length;
  }

  addToCart(product) {
    fetch('/api/cart/', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(product)
    })
      .then(response => response.json())
      .then(data => {
        this.setState({
          cart: this.state.cart.concat(data)
        });
      });
  }

  removeFromCart(cartItemId) {
    fetch('/api/cart', {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ cartItemId })
    })
      .then(() => {
        const [...cart] = this.state.cart.filter(item => item.cartItemId !== cartItemId);
        this.setState({ cart });
      })
      .catch(err => console.error(err));
  }

  totalPrice() {
    const cart = this.state.cart;
    let total = 0;
    for (let i = 0; i < cart.length; i++) {
      total += cart[i].price;
    }
    parseInt(total);
    return total;
  }

  placeOrder(orderDetails) {
    fetch('/api/orders/', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(orderDetails)
    })
      .then(response => response.json())
      .then(data => {
        this.setState({
          view: {
            name: 'catalog',
            params: {}
          },
          cart: []
        });
      });
  }

  render() {
    const setView = this.setView;
    const viewName = this.state.view.name;
    const viewParams = this.state.view.params;
    if (viewName === 'catalog') {
      return (
        <div>
          <Header setView={setView} cartItemCount={this.cartItemCount()}/>
          <ProductList setView={setView}/>
        </div>
      );
    } if (viewName === 'details') {
      return (
        <div>
          <Header setView={setView} cartItemCount={this.cartItemCount()}/>
          <ProductDetails addToCart={this.addToCart} product={this.props.product}
            setView={setView} viewParams={viewParams} />
        </div>
      );
    } if (viewName === 'cart') {
      return (
        <div>
          <Header setView={setView} cartItemCount={this.cartItemCount()} />
          <CartSummary totalPrice={this.totalPrice()} setView={setView} getCartItems={this.getCartItems}
            viewParams={viewParams} cart={this.state.cart} product={this.props.product}
            removeFromCart={cartItemId => this.removeFromCart(cartItemId)}/>
        </div>
      );
    } if (viewName === 'checkout') {
      return (
        <div>
          <Header setView={setView} cartItemCount={this.cartItemCount()} />
          <CheckoutForm placeOrder={this.placeOrder}
            totalPrice={this.totalPrice()} setView={setView}
            viewParams={viewParams} cart={this.state.cart} />
        </div>
      );
    }
  }
}

export default App;
