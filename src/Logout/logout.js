import React, { Component } from "react";
import axios from "axios";
import "./logout.css";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";

function Logout(props) {
  const [values, setValues] = React.useState({
    email: "",
    password: ""
  });

  const handleChange = name => e => {
    setValues({ ...values, [name]: e.target.value });
  };
  const handleSubmit = e => {
    e.preventDefault();
    console.log("state", values);
    fetch("http://localhost:8080/api/auth/logout", {
      method: "POST",
      credentials: "include",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        first_name: values.first_name,
        last_name: values.last_name,
        password: values.password,
        username: values.username,
        email: values.email
      })
    })
      .then(() => {
        console.log("User Logged Out...");
      })
      .catch(err => {
        console.log(err);
      });
  };

  return (
    <div className="container">
      <div className="logoutHolder">
        <form onSubmit={handleSubmit}>
          <TextField
            id="email"
            label="email"
            key="email"
            value={values.email}
            onChange={handleChange("email")}
            margin="normal"
            variant="outlined"
            fullWidth="true"
          />
          <br />
          <TextField
            id="password"
            label="password"
            type="password"
            key="password"
            value={values.password}
            onChange={handleChange("password")}
            margin="normal"
            variant="outlined"
            fullWidth="true"
          />
          <br />
          <Button
            type="submit"
            fullWidth="true"
            color="secondary"
            variant="contained"
          >
            Submit
          </Button>
        </form>
      </div>
    </div>
  );
}

export default Logout;