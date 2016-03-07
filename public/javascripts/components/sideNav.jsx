/**
 * This builds out all the links on the left hand side nav bar.
 */

import React from 'react';
import { Link } from 'react-router';
import ApiService from './../middleware/apiService.jsx';

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
        <a className="mdl-navigation__link" href="/api/v1/graphql">GraphQL Explorer</a>
      </nav>
    );
  },

  componentDidUpdate() {
    this.forceUpdate();
  },

  render() {
    if (ApiService.isAuthenticated()) {
      return this.loggedInNav();
    }
    return this.loggedOutNav();
  }
});