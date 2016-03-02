import React from 'react';
import ReactDOM from 'react-dom';
import { Router, Route, IndexRoute, hashHistory } from 'react-router';
const ApiService = require('./middleware/apiService.jsx');

// Components
const App = require('./components/app.jsx');
const Register = require('./components/register.jsx');
const Login = require('./components/login.jsx');

// Build out so that the ApiService can be passed around.
const RegisterWrapper = React.createClass({
  render() {
    return <Register apiService={ApiService} />;
  }
});

const LoginWrapper = React.createClass({
  render() {
    return <Login apiService={ApiService} />;
  }
});

const AppWrapper = React.createClass({
  render() {
    return <App {...this.props} apiService={ApiService} />;
  }
});

// TODO: Turn this into a list of tasks.
const Home = React.createClass({
  render() {
    return <h1>Yay!</h1>;
  }
});

// The router.
const routes = {
  path: '/',
  component: AppWrapper,
  indexRoute: { component: Home },
  childRoutes: [
    { path: 'register', component: RegisterWrapper },
    { path: 'login', component: LoginWrapper }
  ]
};

ReactDOM.render(
  <Router history={hashHistory} routes={routes} />,
  document.getElementById('appContainer')
);