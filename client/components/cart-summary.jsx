import React from 'react';
import CartSummaryItem from './cart-summary-item';

class CartSummary extends React.Component {
  constructor(props) {
    super(props);
    this.setView3 = this.setView3.bind(this);
  }

  setView3(event) {
    this.props.setView('catalog', {});
  }

  render() {
    if (this.props.cart === []) {
      return (
        <h2>
          Your cart is empty
        </h2>
      );
    } else {
      return (
        <div className="container cartItems d-flex flex-wrap justify-content-space-between">
          <div className="mt-1 ml-2 text-muted" onClick={this.setView3}> &lt; back to catalog</div>
          <h2>My Cart</h2>
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
          <div>Item Total: </div>
        </div>
      );
    }
  }
}
export default CartSummary;
