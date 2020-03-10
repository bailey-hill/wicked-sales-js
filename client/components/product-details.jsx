import React from 'react';

class ProductDetails extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      product: null
    };
  }

  componentDidMount() {
    event.preventDefault();
    fetch(`/api/products/${event.target.productId}`)
      .then(response => response.json())
      .then(data => {
        return this.setState({ product: data });
      });
  }

  render() {
    return null;
  }
}

export default ProductDetails;
