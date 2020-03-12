import React from 'react';
import ProductListItem from './product-list-item';

class ProductList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      products: []
    };
    this.goToDetails = this.goToDetails.bind(this);
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

  goToDetails(event) {
    const productId = Number(event.currentTarget.getAttribute('id'));
    this.props.setView('details', { productId });
  }

  render() {
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
              goToDetails={this.goToDetails}
              productId={product.productId}
            />);
        })
        }
      </div>
    );
  }
}
export default ProductList;
