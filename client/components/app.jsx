
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
      }
    };
    this.setView = this.setView.bind(this);
  }

  setView(name, params) {
    this.setState({
      view: {
        name: name,
        params
      }
    });
  }

  render() {
    const setView = this.setView;
    const viewName = this.state.view.name;
    const viewParams = this.state.view.params;
    if (viewName === 'catalog') {
      return (
        <div>
          <Header />
          <ProductList setView={setView}/>
        </div>
      );
    } if (viewName === 'details') {
      return (
        <div>
          <Header />
          <ProductDetails product={this.props.product} setView={setView} viewParams={viewParams} />
        </div>
      );
    }
  }
}

export default App;
