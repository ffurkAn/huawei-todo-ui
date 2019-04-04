import React, { Component } from 'react';
import './App.css';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import LoginForm from './containers/LoginForm';

class App extends Component {
  render() {
    return (
      <Router>
          <Route path="/login" component={LoginForm} />
      </Router>

    );
  }
}

export default App;
