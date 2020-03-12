import React from 'react';
import CartSummaryItem from './cart-summary-item';

class CartSummary extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      cartItems: []
    };
    this.setView2 = this.setView2.bind(this);
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

  render() {
    return (
      <div className="container d-flex flex-wrap justify-content-center">
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
      </div>
    );
  }
}
export default CartSummary;
