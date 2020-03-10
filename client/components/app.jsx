
import React from 'react';
import Header from './header';
import ProductList from './product-list';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      view: {
        name: 'catalog',
        params: {}
      }
    };
    this.setView = this.setView.bind(this);
  }

  setView(name, params) {
    this.setState({
      view: {
        name: 'details'
        // params: { productId: product.productId }
      }
    });
  }

  render() {
    const setView = this.state.setView;
    return (
      <div>
        <Header />
        <ProductList setView={setView}/>
      </div>
    );
  }
}

export default App;
