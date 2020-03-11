import React from 'react';

class Header extends React.Component {
  render() {
    return (
      <nav className="navbar navbar-dark bg-dark">
        <h2 className="navbar-brand ml-5">$Wicked Sales</h2>
        <h2 className="navbar-brand ml-5">Item Count: {this.props.cardItemCount}</h2>
      </nav>
    );
  }
}
export default Header;
