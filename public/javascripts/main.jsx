import React from 'react';
import ReactDOM from 'react-dom';
import { Router, Route, IndexRoute, hashHistory } from 'react-router';
import ApiService from './middleware/apiService.jsx';

// Components
import App from './components/app.jsx';
import Register from './components/register.jsx';
import Login from'./components/login.jsx';

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