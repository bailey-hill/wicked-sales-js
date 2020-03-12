import React from 'react';
import CartSummaryItem from './cart-summary-item';

class CartSummary extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      cartItems: []
    };
    this.setView3 = this.setView3.bind(this);
  }

  componentDidMount() {
    this.getProducts();
  }

  getProducts() {
    fetch('/api/products/')
      .then(response => response.json())
      .then(data => {
        return this.setState({ products: data });
      });
  }

  setView3(event) {
    this.props.setView('catalog', {});
  }

  render() {
    return (
      <div className="container d-flex flex-wrap justify-content-center">
        <div className="mt-1 ml-2 text-muted" onClick={this.setView3}> &lt; back to catalog</div>
        <h2>My Cart</h2>
        {this.props.products.map(product => {
          return (
            <CartSummaryItem
              key={product.productId}
              name={product.name}
              image={product.image}
              price={product.price}
              shortDescription={product.shortDescription}
              productId={product.productId}
            />);
        })
        }
        <div>Item Total: </div>
      </div>
    );
  }
}
export default CartSummary;
