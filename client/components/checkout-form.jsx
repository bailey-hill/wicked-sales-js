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
        <div className="mt-1 ml-2 text-muted pointer text-general" onClick={this.goToCatalog}> &lt; continue shopping</div>
        <form className="d-flex justify-content-center w-100 align-items-center flex-column form" onSubmit={this.handleSubmit}>
          <h2 className="text-general">My Cart</h2>
          <h5 className="text-muted text-general">Order Total: <span>{`$ ${(this.props.totalPrice / 100).toFixed(2)}`}</span></h5>
          <div className="w-75 submissionRow mt-1">
            <div className="mb-1 text-general">Name</div>
            <input className="form-control" type="text" id="name"
              placeholder="This is a demo website! Do not use personal information."
              onChange={this.handleChange} />
          </div>
          <div className="w-75 submissionRow mt-1">
            <div className="mb-1 text-general">Credit Card</div>
            <input className="form-control" type="text" id="creditCard"
              placeholder="This is a demo website! Do not use personal information."
              onChange={this.handleChange} />
          </div>
          <div className="w-75 submissionRow mt-1">
            <div className="mb-1 text-general">Shipping Address</div>
            <textarea className="form-control" type="number" id="shippingAddress"
              placeholder="This is a demo website! Do not use personal information."
              onChange={this.handleChange} />
          </div>
          <div className="d-flex justify-content-start orderButton w-75">
            <button disabled={!(this.state.name && this.state.creditCard && this.state.shippingAddress)}
              className="mt-3 mr-3 btn btn-primary rounded-pill" onSubmit={this.handleSubmit}
              type="submit" value="Submit">Place Order</button>
            <input className="mt-3 btn btn-light rounded-pill" type="reset" value="Cancel" />
          </div>
        </form>
      </div>
    );
  }
}

export default CheckoutForm;
