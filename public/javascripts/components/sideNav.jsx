/**
 * This builds out all the links on the left hand side nav bar.
 */

import React from 'react';
import { Link } from 'react-router';
const Immutable = require('immutable');

const baseRoutes = [
  {to: '/login', label: 'Login'},
  {to: '/register', label: 'Register'}
];

const loggedInRoutes = [
  {to: '/logout', label: 'logout'}
];

module.exports = React.createClass({
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
    let Links = this.state.routes.map(route => (
      <Link className="mdl-navigation__link" to={route.to}>{route.label}</Link>
    ));
    return (
      <nav className="mdl-navigation">
        {Links}
      </nav>
    );
  }
});