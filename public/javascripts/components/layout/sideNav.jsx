'use strict';

import React from 'react';
import { Link } from 'react-router';
import ApiService from './../../middleware/apiService.jsx';

/**
 * This is the main container for the SideNav.
 */
export default class SideNav extends React.Component {
  constructor(props) {
    super(props);

    this.ApiService = new ApiService();
    this.state = this.buildState(this.ApiService.isAuthenticated());
  }

  componentDidUpdate() {
    this.ApiService = new ApiService();
    const isAuthenticated = this.ApiService.isAuthenticated();
    const stateChanged = isAuthenticated != this.state.isAuthenticated;
    if (stateChanged) {
      this.setState(this.buildState(isAuthenticated));
    }
  }

  buildState(isAuthenticated) {
    if (isAuthenticated) {
      return {
        Links: this.loggedInNav(),
        isAuthenticated: isAuthenticated
      };
    }

    if (!isAuthenticated) {
      return {
        Links: this.loggedOutNav(),
        isAuthenticated: isAuthenticated
      };
    }
  }

  loggedOutNav() {
    return (
      <nav className="mdl-navigation">
        <Link className="mdl-navigation__link" to="/login">Login</Link>
        <Link className="mdl-navigation__link" to="/register">Register</Link>
      </nav>
    );
  }

  loggedInNav() {
    return (
      <nav className="mdl-navigation">
        <Link className="mdl-navigation__link" to="/tasks">Tasks</Link>
        <Link className="mdl-navigation__link" to="/boards">Boards</Link>
        <a className="mdl-navigation__link" href="/api/v1/graphql">GraphQL Explorer</a>
      </nav>
    );
  }

  render() {
    return (
      <div className="mdl-layout__drawer" id="sideNav">
        <span className="mdl-layout-title mdl-color--blue-grey mdl-color-text--white">Germlin Tasker</span>
        {this.state.Links}
      </div>
    );
  }
}