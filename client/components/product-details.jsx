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
        <div className="d-flex align-items-center container-fluid flex-wrap">
          <div className="pointer mt-1 ml-2 text-muted row" onClick={this.goToCatalog}> &lt; back to catalog</div>
          <div className=" d-flex align-items-center justify-content-center row p-5" id={this.props.productId}>

            <div className="d-flex justify-content-space-between align-items-start row">

              <div className="w-100 d-flex  col">

                <img className="mt-2 ml-2 images" src={this.state.product.image} />
              </div>
              <div className="d-flex align-items-start flex-column col">
                <h3 className="mt-5 ml-2 text-name">{this.state.product.name}</h3>
                <h5 className="text-muted text-general mt-2">{`$ ${(this.state.product.price / 100).toFixed(2)}`}</h5>
                <p className="text-general mt-2">{this.state.product.shortDescription}</p>
                <button type="button" className="btn btn-dark rounded-pill btn-block mt-2" onClick={() => this.props.addToCart(this.state.product)}>Add to Cart</button>
                <p className="text-general mt-3 line-height">{this.state.product.longDescription}</p>
              </div>
            </div>

          </div>
        </div>
      );
    }
  }
}

export default ProductDetails;
