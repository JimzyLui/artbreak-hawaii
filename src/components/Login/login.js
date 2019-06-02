import React, { Component } from "react";
import "./login.css";

import { withStyles } from "@material-ui/styles";
import Paper from "@material-ui/core/Paper";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";

// custom-styled components
const CssText = withStyles({
  root: {
    "& label.Mui-focused": {
      color: "#D88A8A"
    },
    "& .MuiInput-underline: after": {
      borderBottomColor: "#D88A8A"
    },
    "& .MuiOutlinedInput-root": {
      "& fieldset": {
        borderColor: "#D88A8A"
      },
      "&:hover fieldset": {
        borderColor: "#D88A8A"
      },
      "&.Mui-focused fieldset": {
        borderColor: "#D88A8A"
      }
    }
  }
})(TextField);

const CustomButton = withStyles({
  root: {
    backgroundColor: "#D88A8A",
    "&:hover": {
      backgroundColor: "#D88A8A"
    }
  }
})(Button);

export default function Login(props) {
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
    fetch("http://localhost:8080/api/auth/login", {
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
        console.log("User Logged In...");
      })
      .catch(err => {
        console.log(err);
      });
  };

  return (
    <div className="container">
      <Paper className="formHolder">
        <h1 className="form-title">Login</h1>
        <form onSubmit={handleSubmit}>
          <CssText
            id="email"
            label="email"
            key="email"
            value={values.email}
            onChange={handleChange("email")}
            margin="normal"
            fullWidth={true}
            variant="outlined"
          />
          <br />
          <CssText
            id="password"
            label="password"
            type="password"
            key="password"
            value={values.password}
            onChange={handleChange("password")}
            margin="normal"
            variant="outlined"
            fullWidth={true}
          />
          <br />
          <CustomButton type="submit" fullWidth={true} variant="filled">
            Submit
          </CustomButton>
        </form>
      </Paper>
    </div>
  );
}
