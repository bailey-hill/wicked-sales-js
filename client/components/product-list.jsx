import React from 'react';
import ProductListItem from './product-list-item';

class ProductList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      products: []
    };
    this.setView2 = this.setView2.bind(this);
  }

  componentDidMount() {
    this.getProducts();
  }

  getProducts() {
    fetch('/api/products/')
      .then(response => response.json())
      .then(data => {
        return this.setState({ products: data });
      });
  }

  setView2(event) {
    // console.log(event.currentTarget.getAttribute('id'));
    // console.log(this.props.products.productId);
    // console.log(Number(event.currentTarget.getAttribute('id')));
    // const newArr = [];
    // if (this.state.products[Number(event.currentTarget.getAttribute('id'))]) {
    //   newArr.push(this.state.products.productId);
    const productId = Number(event.currentTarget.getAttribute('id'));
    this.props.setView('details', { productId });
    // }
  }

  render() {
    // console.log(this.state.products);

    // console.log(this.props.product.productId);
    return (
      <div className="container d-flex flex-wrap justify-content-center">
        { this.state.products.map(product => {
          return (
            <ProductListItem
              key={product.productId}
              name={product.name}
              image={product.image}
              price={product.price}
              shortDescription={product.shortDescription}
              setView2={this.setView2}
              productId={product.productId}
            />);
        })
        }
      </div>
    );
  }
}
export default ProductList;
