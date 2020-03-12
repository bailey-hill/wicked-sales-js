import React from 'react';
import CartSummaryItem from './cart-summary-item';

class CartSummary extends React.Component {
  constructor(props) {
    super(props);
    this.goToCatalog = this.goToCatalog.bind(this);
    this.goToCheckout = this.goToCheckout.bind(this);
  }

  goToCatalog(event) {
    this.props.setView('catalog', {});
  }

  goToCheckout(event) {
    this.props.setView('checkout', {});
  }

  render() {
    if (this.props.cart.length === 0) {
      return (
        <div>
          <div className="mt-1 ml-2 text-muted" onClick={this.goToCatalog}> &lt; back to catalog</div>
          <h2 className="w-100 text-center myCart text-muted">
          Your cart is empty
          </h2>
        </div>
      );
    } else {
      return (
        <div className="container cartItems d-flex flex-wrap justify-content-space-between">
          <div className="mt-1 ml-2 text-muted" onClick={this.goToCatalog}> &lt; back to catalog</div>
          <h2 className="w-100 text-center myCart">My Cart</h2>
          {this.props.cart.map(item => {
            return (
              <CartSummaryItem
                key={item.cartItemId}
                name={item.name}
                image={item.image}
                price={item.price}
                shortDescription={item.shortDescription}
                id={item.cartItemId}
              />);
          })
          }
          <div className="mb-3 w-100 d-flex flex-row justify-content-space-between">
            <h3>Total: <span className="text-muted">{`$ ${(this.props.totalPrice / 100).toFixed(2)}`}</span></h3>
            <button type="button" className="mb-3 ml-2 btn btn-primary"
              onClick={this.goToCheckout}>Checkout</button>
          </div>
        </div>
      );
    }
  }
}
export default CartSummary;
