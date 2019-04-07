import React, { Component } from "react";
import { Button, FormGroup, FormControl, ControlLabel } from "react-bootstrap";
import "../../styles/todo.css";
import { Form, Field, reduxForm, change} from "redux-form";
import * as Pages from '../../constants/Pages'

var email = "";
var password= "";

class LoginForm extends Component {
  constructor(props) {
    super(props);
    this.login = this.login.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.changePageToSignUp = this.changePageToSignUp.bind(this);
    this.signUp = this.signUp.bind(this);
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

    this.props.onLogin(postData,()=>{
      Pages.goto(Pages.LIST);
    });

  }

  signUp = (e) => {
    var postData = {};
    postData['email'] = this.state.email;
    postData['password'] = this.state.password;

    this.props.onSignUp(postData,()=>{
      Pages.goto(Pages.LIST);
    });
    /* CommonActions.signUp(postData, () => {
      this.props.history.push('/home')
      console.log("signed up");
    }); */
  }

  changePageToSignUp = (flag) => {

    this.props.onFlagChanged(!flag);
    
    /* this.setState({
      isRegistered: !flag
    }) */
  }

  render() {

    const { isRegisteredFlag, email, password } = this.props;


    return (
      isRegisteredFlag ?

        <div className="Login">
          <h2>Login</h2>
          <FormGroup controlId="email" bsSize="large">
            <ControlLabel>Email</ControlLabel>
            <FormControl
              autoFocus
              type="email"
              value={email}
              onChange={this.handleChange}
            />
          </FormGroup>
          <FormGroup controlId="password" bsSize="large">
            <ControlLabel>Password</ControlLabel>
            <FormControl
              value={password}
              onChange={this.handleChange}
              type="password"
            />
          </FormGroup>
          <Button
            block
            bsSize="large"
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
              value={email}
              onChange={this.handleChange}
            />
          </FormGroup>
          <FormGroup controlId="password" bsSize="large">
            <ControlLabel>Password</ControlLabel>
            <FormControl
              value={password}
              onChange={this.handleChange}
              type="password"
            />
          </FormGroup>
          <Button
            block
            bsSize="large"
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

export default reduxForm({
  form: "loginForm",
  enableReinitialize: true
})(LoginForm)
