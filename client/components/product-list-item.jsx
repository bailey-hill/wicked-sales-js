import React from 'react';

class ProductListItem extends React.Component {
  render() {
    return (
      <div className="w-25 m-3 card">
        <div className="card-body">
          <div className="img-container">
            <img className="images card-img-top" src={this.props.image} />
          </div>
          <div className="card-body-text-container">
            <h5 className="card-title">{this.props.name}</h5>
            <h6 className="card-subtitle">{`$ ${(this.props.price / 100).toFixed(2)}`}</h6>
            <p className="card-text">{this.props.shortDescription}</p>
          </div>
        </div>
      </div>
    );
  }
}

export default ProductListItem;
