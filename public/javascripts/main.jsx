import React from 'react';
import { render } from 'react-dom';
import { Router, Route, IndexRoute, hashHistory } from 'react-router';

// Components
const App = require('./components/app.jsx');
const Register = require('./components/register.jsx');
const Login = require('./components/login.jsx');

// TODO: Turn this into a list of tasks.
const Home = React.createClass({
  render() {
    return <h1>Yay!</h1>;
  }
});

// The router.
const routes = {
  path: '/',
  component: App,
  indexRoute: { component: Home },
  childRoutes: [
    { path: 'register', component: Register },
    { path: 'login', component: Login }
  ]
};

render(<Router history={hashHistory} routes={routes} />, document.body);