
import React from 'react';
import Header from './header';
import ProductList from './product-list';
import ProductDetails from './product-details';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      view: {
        name: 'catalog',
        params: {}
      },
      cart: []
    };
    this.setView = this.setView.bind(this);
    this.getCartItems = this.getCartItems.bind(this);
    this.cartItemCount = this.cartItemCount.bind(this);
    this.addToCart = this.addToCart.bind(this);
  }

  componentDidMount() {
    this.getCartItems();
  }

  setView(name, params) {
    this.setState({
      view: {
        name: name,
        params
      }
    });
  }

  getCartItems() {
    fetch('/api/cart/')
      .then(response => response.json())
      .then(data => {
        return this.setState({ cart: data });
      });
  }

  cartItemCount() {
    const data = this.state.cart;
    let total = 0;
    for (let i = 0; i < data.length; i++) {
      total += data[i];
    }
    Number(total);
    return total;
  }

  addToCart(product) {
    fetch('/api/cart/', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(product)
    })
      .then(response => response.json())
      .then(data => {
        this.setState({
          cart: this.state.cart.concat(data)
        });
      });
  }

  render() {
    const setView = this.setView;
    const viewName = this.state.view.name;
    const viewParams = this.state.view.params;
    if (viewName === 'catalog') {
      return (
        <div>
          <Header cardItemCount={this.cartItemCount()}/>
          <ProductList setView={setView}/>
        </div>
      );
    } if (viewName === 'details') {
      return (
        <div>
          <Header />
          <ProductDetails addToCart={this.addToCart} product={this.props.product} setView={setView} viewParams={viewParams} />
        </div>
      );
    }
  }
}

export default App;
