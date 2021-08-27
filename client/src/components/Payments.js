import React, { Component } from "react";
import StripeCheckout from "react-stripe-checkout";
import { connect } from "react-redux";
import * as actions from "../actions";

class Payments extends Component {
  render() {
    // debugger;
    return (
      <StripeCheckout
        name="Emaily"
        description="$50 for 50 credits"
        amount={5000} //in cents
        token={(token) => this.props.handleToken(token)}
        stripeKey={process.env.REACT_APP_STRIPE_KEY}
      >
        <button className="btn waves-effect waves-light teal lighten-1">
          Add Credits
        </button>
      </StripeCheckout>
    );
  }
}
export default connect(null, actions)(Payments);
