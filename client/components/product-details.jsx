import React from 'react';

class ProductDetails extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      product: null
    };
  }

  componentDidMount() {
    // const eventTarget = event.target.id;
    // console.log('g');
    const product = this.state.product;
    fetch('/api/products/1')
      .then(response => response.json())
      .then(data => {
        // console.log(this.props.product.productId);
        // if (this.props.product.productId === Number(eventTarget)) {
        return this.setState({ product });
        // }
      });
    // this.props.setView();
  }

  render() {
    return (
      <div>
        back to catalog
      </div>
    );
  }
}

export default ProductDetails;
