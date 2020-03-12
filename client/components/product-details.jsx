import React from 'react';

class ProductDetails extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      product: null
    };
    this.goToCatalog = this.goToCatalog.bind(this);
  }

  componentDidMount() {
    fetch(`/api/products/${this.props.viewParams.productId}`)
      .then(response => response.json())
      .then(data => {
        return this.setState({ product: data });
      });
  }

  goToCatalog(event) {
    this.props.setView('catalog', {});
  }

  render() {
    if (this.state.product === null) {
      return null;
    } else {
      return (
        <div className="d-flex align-items-center justify-content-center">
          <div className="w-75 m-3 card d-flex align-items-center justify-content-center" id={this.props.productId}>

            <div className="d-flex justify-content-space-between align-items-start flex-row">
              <div>
                <div className="mt-1 ml-2 text-muted" onClick={this.goToCatalog}> &lt; back to catalog</div>
                <img className="mt-2 ml-2 images" src={this.state.product.image} />
              </div>
              <div className="d-flex align-items-start flex-column">
                <h3 className="mt-5 ml-2">{this.state.product.name}</h3>
                <h5 className="text-muted">{`$ ${(this.state.product.price / 100).toFixed(2)}`}</h5>
                <p>{this.state.product.shortDescription}</p>
                <button type="button" className="btn btn-primary" onClick={() => this.props.addToCart(this.state.product)}>Add to Cart</button>
              </div>
            </div>
            <p>{this.state.product.longDescription}</p>
          </div>
        </div>
      );
    }
  }
}

export default ProductDetails;
