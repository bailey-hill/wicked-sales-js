import React from 'react';
import ProductListItem from './product-list-item';

class ProductList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      products: []
    };
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
      <div className="container myContainer">
        { this.state.products.map(product => {
          return (
            <ProductListItem
              key={product.productId}
              name={product.name}
              image={product.image}
              price={product.price}
              shortDescription={product.shortDescription}
            />);
        })
        }
      </div>
    );
  }
}
export default ProductList;
