import React from 'react';

class ProductListItem extends React.Component {
  render() {
    return (
      // <div className="card-deck">
      // <div className="col w-25 p-3">
      <div className="w-25 m-3 card">
        <div className="card-body">
          <h5 className="card-title">{this.props.name}</h5>
          <img className="images card-img" src={this.props.image}/>
          <h6 className="card-subtitle">{this.props.price}</h6>
          <p className="card-text">{this.props.shortDescription}</p>
        </div>
      </div>
      // </div>
      // </div>
    );
  }
}

export default ProductListItem;
