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
          </div>
        </div>
        <div className="modal fade" id="exampleModal" tabIndex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
          <div className="modal-dialog" role="document">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title text-general" id="exampleModalLabel">{this.props.name}</h5>
                <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                  <span aria-hidden="true">&times;</span>
                </button>
              </div>
              <div className="modal-body text-general">
                Are you sure you want to remove {this.props.name} from your cart?
              </div>
              <div className="modal-footer">
                <button type="button" className="btn btn-secondary rounded-pill" data-dismiss="modal">Cancel</button>
                <button type="button" className="btn btn-danger rounded-pill">Remove</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default CartSummaryItem;
