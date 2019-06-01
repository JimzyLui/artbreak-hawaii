import React, { Component } from "react";

import withRoot from "./components/modules/withRoot";

import NewProduct from "./components/newProduct";

import FileUpload from "./components/newProduct2";
import Main from "./components/Home/main";
import Header from "./components/Header/header";
import Register from "./components/Register/register";
import Login from "./components/Login/login";
import Delete from "./components/Delete/delete";
import { Link } from "react-router-dom";

//react router imports
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

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
      <div>
        <Header />
        <Switch>
          <Route exact path="/" component={Main} />
          <Route path="/login" component={Login} />
          <Route path="/register" component={Register} />
          <Route path="/newProduct" component={FileUpload} />
          <Route path="/delete" component={Delete} />
        </Switch>
      </div>
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
)(App);
