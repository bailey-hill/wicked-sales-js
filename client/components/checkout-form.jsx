import React from 'react';

class CheckoutForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      creditCard: '',
      shippingAddress: ''
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.goToCatalog = this.goToCatalog.bind(this);
  }

  goToCatalog(event) {
    this.props.setView('catalog', {});
  }

  handleChange(event) {
    if (event.target.id === 'name') {
      this.setState({
        name: event.target.value
      });
    }

    if (event.target.id === 'creditCard') {
      this.setState({
        creditCard: event.target.value
      });
    }

    if (event.target.id === 'shippingAddress') {
      this.setState({
        shippingAddress: event.target.value
      });
    }
  }

  handleSubmit(event) {
    event.preventDefault();
    const newSubmission = {
      name: this.state.name,
      creditCard: this.state.creditCard,
      shippingAddress: this.state.shippingAddress
    };
    if (this.state.name.length && this.state.creditCard.length &&
      this.state.shippingAddress.length > 0) {
      this.props.placeOrder(newSubmission);
      this.setState({
        name: '',
        creditCard: '',
        shippingAddress: ''
      });
      event.currentTarget.reset();
    }
  }

  render() {
    return (
      <div>
        <div className="mt-1 ml-2 text-muted pointer" onClick={this.goToCatalog}> &lt; continue shopping</div>
        <form className="d-flex justify-content-center w-100 align-items-center flex-column form" onSubmit={this.handleSubmit}>
          <h2>My Cart</h2>
          <h5 className="text-muted">Order Total: <span>{`$ ${(this.props.totalPrice / 100).toFixed(2)}`}</span></h5>
          <div className="w-75 submissionRow">
            <div className="mb-1">Name</div>
            <input className="form-control" type="text" id="name"
              placeholder="John F. Kennedy"
              onChange={this.handleChange} />
          </div>
          <div className="w-75 submissionRow">
            <div className="mb-1">Credit Card</div>
            <input className="form-control" type="text" id="creditCard"
              placeholder="1234-1234-1234-1234"
              onChange={this.handleChange} />
          </div>
          <div className="w-75 submissionRow">
            <div className="mb-1">Shipping Address</div>
            <textarea className="form-control" type="number" id="shippingAddress"
              placeholder="123 Rick Roll Avenue
            Hollywood, CA
            91976"
              onChange={this.handleChange} />
          </div>
          <div className="d-flex justify-content-start orderButton">
            <button className="mt-3 mr-3 btn btn-primary" onSubmit={this.handleSubmit}
              type="submit" value="Submit">Place Order</button>
            <input className="mt-3 btn btn-light" type="reset" value="Cancel" />
          </div>
        </form>
      </div>
    );
  }
}

export default CheckoutForm;
