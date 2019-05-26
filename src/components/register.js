import React, { Component } from "react";
import axios from "axios";

import Paper from "@material-ui/core/Paper";
import TextField from "@material-ui/core/TextField";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";

function Register() {
  const [values, setValues] = React.useState({
    email: "",
    password: "",
    first_name: "",
    last_name: "",
    username: ""
  });

  const handleChange = name => e => {
    setValues({ ...values, [name]: e.target.value });
  };
  const handleSubmit = e => {
    e.preventDefault();
    console.log("state", values);
    fetch("http://localhost:8080/api/auth/register", {
      method: "POST",
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
        console.log("User added to database");
      })
      .catch(err => {
        console.log(err);
      });
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <TextField
          id="email"
          label="email"
          key="email"
          value={values.email}
          onChange={handleChange("email")}
          margin="normal"
        />
        <TextField
          id="password"
          label="password"
          key="password"
          value={values.password}
          onChange={handleChange("password")}
          margin="normal"
        />
        <TextField
          id="username"
          label="username"
          key="username"
          value={values.username}
          onChange={handleChange("username")}
          margin="normal"
        />
        <TextField
          id="first_name"
          label="first_name"
          key="first_name"
          value={values.first_name}
          onChange={handleChange("first_name")}
          margin="normal"
        />
        <TextField
          id="last_name"
          label="last_name"
          key="last_name"
          value={values.last_name}
          onChange={handleChange("last_name")}
          margin="normal"
        />
        <Button type="submit">Submit</Button>
      </form>
    </div>
  );
}
export default Register;
