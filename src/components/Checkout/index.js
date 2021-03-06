import React, { Component } from "react";
import StripeCheckout from "react-stripe-checkout";

const dotenv = require("dotenv");
dotenv.config({ path: "../.env" });

class Checkout extends Component {
  constructor(props) {
    super(props);
    this.state = {
      items: [],
      checkoutTotal: 0
    };
    this.onToken = this.onToken.bind(this);
  }
  componentDidMount = e => {
    const userId = 4; //NEED TO MAKE DYNAMIC!!!!
    fetch(`http://localhost:8080/cart/${userId}`)
      .then(res => {
        return res.json();
      })
      .then(itemsData => {
        console.log("ITEMS DATA", itemsData);
        this.setState({ items: itemsData });
        console.log("This State", this.state.items);
      })
      .catch(err => {
        console.log(err);
      });
  };

  onToken(token) {
    console.log("onToken", token);
    fetch("http://localhost:8080/payment/checkout", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        stripeToken: token.id
      }),
      credentials: "include"
    })
      .then(res => {
        window.location.replace("http://localhost:8081/");
      })
      .catch(err => {
        console.log("ERROR on TOKEN", err);
      });
  }

  render() {
    const { items } = this.state;
    let total = 0;
    return (
      <div>
        {items.map(item => (
          <div>
            <div key="title">{item.title}</div>
            <div key="price">${item.price}</div>
          </div>
        ))}
        <div>
          Payment Total: $
          {items.forEach(item => (total += parseInt(item.price)))}
          {total.toFixed(2)}
        </div>
        <div>
          <StripeCheckout
            key="stripe-checkout"
            token={this.onToken}
            stripeKey="pk_test_dFwJK6MxVB2Jj5XDUuaFAoIl00oVxjFN1t"
          />
        </div>
      </div>
    );
  }
}

export default Checkout;
