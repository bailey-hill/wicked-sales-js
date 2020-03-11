import React from 'react';

class ProductDetails extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      product: null
    };
  }

  componentDidMount() {
    fetch(`/api/products/${this.props.viewParams.productId}`)
      .then(response => response.json())
      .then(data => {
        return this.setState({ product: data });
      });
  }

  render() {
    if (this.state.product === null) {
      return null;
    } else {
      return (
        <div id={this.props.productId}>
          <div>back to catalog</div>
          <img src={this.state.product.image} />
          <div>{this.state.product.name}</div>
          <div>{this.state.product.price}</div>
          <div>{this.state.product.shortDescription}</div>
          <div>{this.state.product.longDescription}</div>
        </div>
      );
    }
  }
}

export default ProductDetails;
