import React from 'react';
import { Link } from 'react-router';

module.exports = React.createClass({
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