import React, { Component } from "react";

import withRoot from "./components/modules/withRoot";
import Header from "./components/header";
import Gallery from "./components/gallery";
import Cover from "./components/cover";
import Register from "./components/register";
import Login from "./components/login";
import ShopCart from "./components/shopping-cart";

//react router imports
import {
  BrowserRouter as Router,
  Route,
  Link,
  Redirect,
  withRouter,
  Switch
} from "react-router-dom";

//actions
import { getProducts } from "./actions/actions";

import { connect } from "react-redux";
import Axios from "axios";

class App extends Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    console.log("this.props", this.props);
    console.log(">>>>>>", this.props.getProducts());
    this.props.getProducts();
  }

  render() {
    return (
      <React.Fragment>
        <Header />
        <Cover />
        <Gallery />
        {/* <Register />
        <Login /> */}
        <div>ShoppingCart</div>
        <ShopCart />
      </React.Fragment>
    );
  }
}

const mapDispatchToProps = dispatch => {
  return {
    getProducts: () => dispatch(getProducts())
  };
};

export default connect(
  null,
  mapDispatchToProps
)(withRoot(App));
