/**
 * This builds out all the links on the left hand side nav bar.
 */

import React from 'react';
import { Link } from 'react-router';
const Immutable = require('immutable');

const baseRoutes = [
  { to: '/login', label: 'Login' },
  { to: '/register', label: 'Register' }
];

const loggedInRoutes = [

];

const LoggedInNav = React.createClass({
  render() {
    let Links = this.props.routes.map(route => (
      <Link className="mdl-navigation__link" to={route.to}>{route.label}</Link>
    ));
    return (
      <nav className="mdl-navigation">
        {Links}
        <a className="mdl-navigation__link" href="/api/v1/graphql">GraphQL Explorer</a>
      </nav>
    );
  }
});

const LoggedOutNav = React.createClass({
  render() {
    let Links = this.props.routes.map(route => (
      <Link className="mdl-navigation__link" to={route.to}>{route.label}</Link>
    ));
    return (
      <nav className="mdl-navigation">
        {Links}
      </nav>
    );
  }
});

export default React.createClass({
  buildState(props) {
    // Update the state.
    let state = Immutable.Map(props).toObject();

    // Update the routes
    state.routes = baseRoutes;
    if (state.apiService.isAuthenticated()) {
      state.routes = loggedInRoutes;
    }
    this.setState(state);
  },

  getInitialState() {
    return {
      routes: baseRoutes
    };
  },

  componentDidUpdate() {
    this.buildState(this.state);
  },

  componentDidMount() {
    this.buildState(this.props);
  },

  render() {
    // Build out the links dynamicly.
    let Nav = <LoggedOutNav {...this.state} />;
    if (this.state.hasOwnProperty('apiService')
      && this.state.apiService.isAuthenticated()
    ) {
      Nav = <LoggedInNav {...this.state} />;
    }

    return Nav;
  }
});