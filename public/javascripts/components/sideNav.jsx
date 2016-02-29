import React from 'react';

const Link = React.createClass({
  render() {
    return <a className="mdl-navigation__link" href={this.props.to}>{this.props.label}</a>;
  }
});

module.exports = React.createClass({
  render() {
    // Build out the links dynamicly.
    let Links = this.props.routes.map(route => (
      <Link {...route} />
    ));
    return (
      <nav className="mdl-navigation">
        {Links}
        <a className="mdl-navigation__link" href="#/login">Login</a>
        <a className="mdl-navigation__link" href="#/register">Register</a>
      </nav>
    )
  }
});