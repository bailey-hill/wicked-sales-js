import React from 'react';
import CartSummaryItem from './cart-summary-item';

class CartSummary extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      removing: null
    };
    this.goToCatalog = this.goToCatalog.bind(this);
    this.goToCheckout = this.goToCheckout.bind(this);
  }

  setRemoving(productId) {
    this.setState({ removing: productId });
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
          <div className="pointer mt-1 ml-2 text-muted text-general" onClick={this.goToCatalog}> &lt; back to catalog</div>
          <h2 className="w-100 text-center myCart text-muted text-general">
          Your cart is empty
          </h2>
        </div>
      );
    } else {
      return (
        <div className="container cartItems d-flex flex-wrap justify-content-space-between">
          <div className="pointer mt-1 ml-2 text-muted text-general" onClick={this.goToCatalog}> &lt; back to catalog</div>
          <h2 className="w-100 text-center myCart text-general">My Cart</h2>
          {this.props.cart.map(item => {
            return (
              <CartSummaryItem
                key={item.cartItemId}
                name={item.name}
                image={item.image}
                price={item.price}
                shortDescription={item.shortDescription}
                id={item.cartItemId}
                removeFromCart={productId => this.setRemoving(productId)}
              />);
          })
          }
          <div className="ml-4 w-100 d-flex flex-row justify-content-space-between">
            <h3 className="text-general">Total: <span className="text-muted text-general">{`$ ${(this.props.totalPrice / 100).toFixed(2)}`}</span></h3>

          </div>
          <button type="button" className="mb-3 w-25 d-block ml-2 btn-dark rounded-pill btn-lg"
            onClick={this.goToCheckout}>Checkout</button>
        </div>
      );
    }
  }
}
export default CartSummary;
