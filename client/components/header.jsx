import React from 'react';

class Header extends React.Component {
  constructor(props) {
    super(props);
    this.goToCart = this.goToCart.bind(this);
  }

  goToCart(event) {
    this.props.setView('cart', {});
  }

  render() {
    return (
      <nav className="d-flex justify-content-space-between navbar navbar-dark bg-dark">
        <h2 className="navbar-brand ml-5">$Wicked Sales</h2>
        <h2 onClick={this.goToCart} className="navbar-brand mr-5" ><span>
          {this.props.cartItemCount}</span> Item <i className="fas fa-shopping-cart"></i></h2>
      </nav>
    );
  }
}
export default Header;
