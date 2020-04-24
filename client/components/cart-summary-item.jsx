import React from 'react';

class CartSummaryItem extends React.Component {
  removeItem() {
    this.props.removeFromCart(this.props.item.cartItemId);
  }

  render() {
    return (
      <div id={this.props.cartItemId} className="card mb-3 d-flex align-items-center justify-content-space-between">
        <div className="card-body p-0 d-flex flex-row">
          <div className="img-container">
            <img className="image" src={this.props.image} />
          </div>
          <div className="d-flex justify-content-space-between align-items-start flex-column">
            <h5 className="card-title text-name">{this.props.name}</h5>
            <h6 className="card-subtitle text-muted text-general">{`$ ${(this.props.price / 100).toFixed(2)}`}</h6>
            <p className="card-text text-general">{this.props.shortDescription}</p>
            <button onClick={() => this.removeItem()} className="btn btn-danger rounded-pill"
              type="button" data-toggle="modal" data-target="#exampleModal">
              Remove Item</button>
            <form className="mt-3 ml-2">
              <label className="text-general" htmlFor="quantity">Quantity: </label>
              <input className="p-0 col-3 text-general ml-1" type="number" id="quantity" name="quantity">
              </input>
            </form>
          </div>
        </div>
      </div>
    );
  }
}

export default CartSummaryItem;
