import React, { Component } from "react";
import { Button, FormGroup, FormControl, ControlLabel } from "react-bootstrap";
import "../styles/todo.css";
import * as CommonActions from '../actions/CommonActions';

export default class Login extends Component {
  constructor(props) {
    super(props);

    this.state = {
      email: "",
      password: "",
      isRegistered: true
    };
  }

  validateForm() {
    return this.state.email.length > 0 && this.state.password.length > 0;
  }

  handleChange = event => {
    this.setState({
      [event.target.id]: event.target.value
    });
  }

  login = (e) => {

    var postData = {};
    postData['email'] = this.state.email;
    postData['password'] = this.state.password;

    CommonActions.login(postData, function () {
      console.log("logged in");
    });
  }

  signUp = (e) => {
    var postData = {};
    postData['email'] = this.state.email;
    postData['password'] = this.state.password;

    CommonActions.signUp(postData, function () {
      console.log("signed up");
    });
  }

  changePageToSignUp = (flag) => {

    this.setState({
      isRegistered:!flag
    })
  }

  render() {

    return (
      this.state.isRegistered ?
        <div className="Login">
          <h2>Login</h2>
          <FormGroup controlId="email" bsSize="large">
            <ControlLabel>Email</ControlLabel>
            <FormControl
              autoFocus
              type="email"
              value={this.state.email}
              onChange={this.handleChange}
            />
          </FormGroup>
          <FormGroup controlId="password" bsSize="large">
            <ControlLabel>Password</ControlLabel>
            <FormControl
              value={this.state.password}
              onChange={this.handleChange}
              type="password"
            />
          </FormGroup>
          <Button
            block
            bsSize="large"
            disabled={!this.validateForm()}
            type="submit"
            onClick={(e) => { this.login(e); }}
          >
            Login
          </Button>

          <Button
            block
            bsSize="large"
            type="submit"
            onClick={(e) => { this.changePageToSignUp(true); }}
          >
            You do not have an acoount?
          </Button>
        </div>
        :

        <div className="Login">
          <h2>Sign Up</h2>
          <FormGroup controlId="email" bsSize="large">
            <ControlLabel>Email</ControlLabel>
            <FormControl
              autoFocus
              type="email"
              value={this.state.email}
              onChange={this.handleChange}
            />
          </FormGroup>
          <FormGroup controlId="password" bsSize="large">
            <ControlLabel>Password</ControlLabel>
            <FormControl
              value={this.state.password}
              onChange={this.handleChange}
              type="password"
            />
          </FormGroup>
          <Button
            block
            bsSize="large"
            disabled={!this.validateForm()}
            type="submit"
            onClick={(e) => { this.signUp(e); }}
          >
            Sign Up
          </Button>

          <Button
            block
            bsSize="large"
            type="submit"
            onClick={(e) => { this.changePageToSignUp(false); }}
          >
            I have an account!
          </Button>
        </div>
    )

  }
}
