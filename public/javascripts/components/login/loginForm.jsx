'use strict';

import React from 'react';
import FormComponent from './../formComponent.jsx';
import { browserHistory } from 'react-router';
import ApiService from './../../middleware/apiService.jsx';

/**
 * This is the Login Form itself.
 */
export default class LoginForm extends FormComponent {

  constructor(props) {
    super(props);
    this.state = {
      username: '',
      password: ''
    };

    this.ApiService = new ApiService();

    // Bind the local instance to the methods.
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(event) {
    event.preventDefault();
    const login = this.ApiService.login(this.state);
    login.then( (response) => {
      this.ApiService.setSession(response.data);
      browserHistory.push('/tasks');
    }).catch( (response) => {
      this.setState({err: response.data.message});
    });
  }

  render() {
    return (
      <form action="" onSubmit={this.handleSubmit}>
        <p>
          {(() => {
            if (this.state.error) {
              return this.state.error;
            }
          })()}
        </p>
        <div className="row mdl-textfield mdl-js-textfield mdl-cell--12-col">
          <input
              className="mdl-textfield__input"
              type="text"
              id="usernameField"
              value={this.state.username}
              onChange={this.handleChange('username')}
          />
          <label
              className="mdl-textfield__label"
              htmlFor="usernameField"
          >
            Username
          </label>
        </div>
        <div className="mdl-textfield mdl-js-textfield mdl-cell--12-col">
          <input
              className="mdl-textfield__input"
              type="password"
              id="passwordField"
              value={this.state.password}
              onChange={this.handleChange('password')}
          />
          <label
              className="mdl-textfield__label"
              htmlFor="passwordField"
          >
            Password
          </label>
        </div>
        <div className="mdl-cell--12-col mdl-textfield--align-right">
          <button
              type="submit"
              className="mdl-button mdl-js-button mdl-button--raised mdl-button--accent"
          >
            Login
          </button>
        </div>
      </form>
    );
  }
}
