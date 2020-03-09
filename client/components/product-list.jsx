import React from 'react';

class ProductList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      products: []
    };
    this.getProducts = this.getProducts.bind(this);
  }

  getProducts() {
    fetch('/api/products/')
      .then(response => response.json())
      .then(data => {
        this.setState({ products: data });
      });
  }

  componentDidMount() {
    this.getProducts();
  }

  render() {
    const products = this.state.products;
    return (
      <ProductList products={products}/>
    );
  }
}
export default ProductList;
