'use strict';

import React from 'react';
import { render } from 'react-dom';
import LoginForm from './loginForm.jsx';

/**
 * This is the main view container for the login page.
 */
export default class Login extends React.Component {

  constructor(props) {
    super(props);
  }

  componentDidMount() {

    // This is needed because react-router + chrome prevents
    // the binding of onSubmit={this.handleSubmit}.
    render(
      <LoginForm />,
      document.getElementById('loginForm')
    );

    // Update the page title.
    render(
      <h3>Login</h3>,
      document.getElementById('pageTitle')
    );
  }

  render() {
    return (
      <div
          className="app-content mdl-color--white mdl-shadow--4dp content mdl-color-text--grey-800 mdl-cell mdl-cell--8-col"
          id="loginForm"
      />
    );
  }
}