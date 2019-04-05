import React, { Component } from 'react';
import './App.css';
import { Switch } from "react-router-dom";
import { Router, Route, Redirect, browserHistory } from "react-router";
import LoginForm from './pages/Login/LoginContainer';
import List from './pages/ToDoList/ToDoListContainer';
import { Provider } from 'react-redux';
import store from './store';

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <Router history={browserHistory}>
          <Switch>
            <Route path="/login" component={LoginForm} />
            <Route path="/list" component={List} />
          </Switch>
        </Router>
      </Provider>

    );
  }
}

export default App;
