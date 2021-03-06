import React from 'react';

class CartSummaryItem extends React.Component {
  removeItem() {
    this.props.removeFromCart(this.props.item.cartItemId);
  }

  render() {
    return (
      <div id={this.props.cartItemId} className="card mb-3 d-flex align-items-center justify-content-space-between container">
        <div className="card-body p-0 d-flex row">
          <div className="img-container pl-1 pr-1 col-md-6 w-100 mt-1 mb-1">
            <img className="image w-100" src={this.props.image} />
          </div>
          <div className=" col-md-6">
            <h5 className="card-title text-name">{this.props.name}</h5>
            <h6 className="card-subtitle text-muted text-general">{`$ ${(this.props.price / 100).toFixed(2)}`}</h6>
            <p className="card-text text-general">{this.props.shortDescription}</p>
            <button
              onClick={() => this.removeItem()}
              className="btn btn-danger rounded-pill"
              type="button" data-toggle="modal" data-target="#exampleModal">
              Remove Item</button>
            <div className="modal fade" id="exampleModal" tabIndex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
              <div className="modal-dialog" role="document">
                <div className="modal-content">
                  <div className="modal-body text-general">
                    Are you sure you want to remove this item from your cart?
                    <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                      <span aria-hidden="true">&times;</span>
                    </button>
                  </div>
                  <div className="modal-footer">
                    <button type="button" className="btn btn-secondary rounded-pill" data-dismiss="modal">Cancel</button>
                    <button onClick={this.props.deleteFromCart} type="button" className="btn btn-danger rounded-pill" data-dismiss="modal">Remove</button>
                  </div>
                </div>
              </div>
            </div>
            <form className="mt-1 ml-2">
              <label className="text-general" htmlFor="quantity">Quantity: {this.props.item.quantity}</label>
            </form>
          </div>
        </div>
      </div>
    );
  }
}

export default CartSummaryItem;
