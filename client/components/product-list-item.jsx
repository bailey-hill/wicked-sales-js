import React from 'react';

class ProductListItem extends React.Component {
  render() {
    return (
      <div id={this.props.productId} onClick={this.props.goToDetails} className="pointer card-width m-3 card d-flex align-items-center justify-content-center">
        <div className="card-body p-0 d-flex flex-column justify-content-around">
          <div className="img-container p-2">
            <img className="card-img-top" src={this.props.image} />
          </div>
          <div className="d-flex justify-content-space-between align-items-start flex-column">
            <h5 className="card-title">{this.props.name}</h5>
            <h6 className="card-subtitle text-muted">{`$ ${(this.props.price / 100).toFixed(2)}`}</h6>
            <p className="card-text">{this.props.shortDescription}</p>
          </div>
        </div>
      </div>
    );
  }
}

export default ProductListItem;
