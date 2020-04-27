import React from 'react';

class Header extends React.Component {
  constructor(props) {
    super(props);
    this.goToCart = this.goToCart.bind(this);
    this.goToCatalog = this.goToCatalog.bind(this);
  }

  goToCart(event) {
    this.props.setView('cart', {});
  }

  goToCatalog(event) {
    this.props.setView('catalog', {});
  }

  render() {
    return (
      <nav className="d-flex justify-content-around navbar header sticky-top container-fluid flex-row">
        <h2 onClick={this.goToCatalog} className="pointer navbar-brand text-header col-sm-3 mobile-header"><i className="short-fall-icon fas fa-stroopwafel">
        </i>  Short Fall Brewery</h2>
        <div className="col-sm">
          <div className="alert alert-warning alert-dismissible fade show text-center mb-0" role="alert">
            <strong>This is a demo website! </strong>
          No real purchases will be made.
            <button type="button" className="close" data-dismiss="alert" aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
        </div>
        <h2 onClick={this.goToCart} className="item-text pointer navbar-brand text-header col-sm-3 mobile-header" ><span>
          {this.props.cartItemCount}</span> Item <i className="fas fa-shopping-cart"></i></h2>
      </nav>
    );
  }
}
export default Header;
