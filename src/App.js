import React, { Component } from "react";

import FileUpload from "./components/newProduct/newProduct";
import Main from "./components/Home/main";
import Header from "./components/Header/header";
import Register from "./components/Register/register";
import Login from "./components/Login/login";
import Delete from "./components/Delete/delete";
import Edit from "./components/editProduct/editProduct";

//react router imports
import { Route, Switch } from "react-router-dom";

//actions
import { getProducts } from "./actions/actions";

import { connect } from "react-redux";
import profile from "./components/Profile/profile";
import GalleryView from "./components/gallery-view";

class App extends Component {
  componentDidMount() {
<<<<<<< HEAD
=======
    // console.log("this.props", this.props);
    // console.log(">>>>>>", this.props.getProducts());
>>>>>>> 94e0950a3c036ff4e42e342801df0a489ee3d239
    this.props.getProducts();
  }

  render() {
    return (
      <React.Fragment>
        <Header />
        <Switch>
          <Route exact path="/" component={Main} />
          <Route path="/login" component={Login} />
          <Route path="/register" component={Register} />
          <Route path="/newProduct" component={FileUpload} />
          <Route path="/delete" component={Delete} />
          <Route path="/editProduct" component={Edit} />
          <Route path="/profile" component={profile} />
          <Route exact path="/products/:id" component={GalleryView} />
        </Switch>
      </React.Fragment>
    );
  }
}

const mapDispatchToProps = dispatch => {
  return {
    getProducts: () => dispatch(getProducts())
  };
};

console.log("filter data", getProducts());
let products = [{}];

export default connect(
  null,
  mapDispatchToProps
)(App);
