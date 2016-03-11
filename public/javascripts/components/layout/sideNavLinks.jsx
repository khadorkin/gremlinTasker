'use strict';

import React from 'react';
import { Link } from 'react-router';
import { isAuthenticated } from './../../middleware/apiService.jsx';

export default React.createClass({
  loggedOutNav() {
    return (
      <nav className="mdl-navigation">
        <Link className="mdl-navigation__link" to="/login">Login</Link>
        <Link className="mdl-navigation__link" to="/register">Register</Link>
      </nav>
    );
  },

  loggedInNav() {
    return (
      <nav className="mdl-navigation">
        <Link className="mdl-navigation__link" to="/tasks">Tasks</Link>
        <a className="mdl-navigation__link" href="/api/v1/graphql">GraphQL Explorer</a>
      </nav>
    );
  },

  render() {
    if (isAuthenticated()) {
      return this.loggedInNav();
    }

    return this.loggedOutNav();
  }
});