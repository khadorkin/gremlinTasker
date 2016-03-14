'user strict';

import React from 'react';
import { render } from 'react-dom';
import RegisterForm from './registerForm.jsx';

/**
 * This is the view container for the Register section.
 */
export default class Register extends React.Component {

  componentDidMount() {
    // This is needed because react-router + chrome prevents
    // the binding of onSubmit={this.handleSubmit}.
    render(
      <RegisterForm />,
      document.getElementById('registerForm')
    );

    // Update the page title.
    render(
      <h3>Register</h3>,
      document.getElementById('pageTitle')
    );
  }

  render() {

    return (
      <div
          className="app-content mdl-color--white mdl-shadow--4dp content mdl-color-text--grey-800 mdl-cell mdl-cell--8-col"
          id="registerForm"
      />
    );
  }
}
