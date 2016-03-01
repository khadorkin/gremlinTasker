/**
 * This builds out all the links on the left hand side nav bar.
 */

import React from 'react';
import { Link } from 'react-router';

let ApiService = {};

module.exports = React.createClass({
  componentDidMount() {
    // Bind the API service.
    ApiService = this.props.apiService;
  },
  render() {
    // Build out the links dynamicly.
    let Links = this.props.routes.map(route => (
      <Link className="mdl-navigation__link" to={route.to}>{route.label}</Link>
    ));
    return (
      <nav className="mdl-navigation">
        {Links}
        <Link className="mdl-navigation__link" to="/login">Login</Link>
        <Link className="mdl-navigation__link" to="/register">Register</Link>
      </nav>
    )
  }
});