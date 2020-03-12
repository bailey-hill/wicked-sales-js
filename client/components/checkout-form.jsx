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
    this.props.addGrade(newSubmission);
    this.setState({
      name: '',
      creditCard: '',
      shippingAddress: ''
    });
    event.currentTarget.reset();
  }

  render() {
    return (
      <div>
        <form onSubmit={this.handleSubmit}>
          <div className="submissionRow">
            <div>Name</div>
            <input className="form-control" type="text" id="name"
              placeholder="Name"
              onChange={this.handleChange} />
          </div>
          <div className="submissionRow">
            <div>Credit Card</div>
            <input className="form-control" type="text" id="creditCard"
              placeholder="Credit Card"
              onChange={this.handleChange} />
          </div>
          <div>
            <div>Shipping Address</div>
            <textarea className="form-control" type="number" id="shippingAddress"
              placeholder="123 Rick Roll Avenue
            Hollywood, CA
            91976"
              onChange={this.handleChange} />
          </div>
          <div>
            <button className="btn btn-primary" onSubmit={this.handleSubmit}
              type="submit" value="Submit">Place Order</button>
            <input className="btn btn-light" type="reset" value="Cancel" />
          </div>
        </form>
      </div>
    );
  }
}

export default CheckoutForm;
