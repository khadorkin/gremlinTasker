'use strict';

import React from 'react';
import { hashHistory } from 'react-router';
import ApiService from './../../middleware/apiService.jsx';

/**
 * This is the Login Form itself.
 */
export default class LoginForm extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      username: '',
      password: ''
    };

    this.ApiService = new ApiService();

    // Bind the local instance to the methods.
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  handleSubmit(event) {
    event.preventDefault();
    this.ApiService.login(this.state, (err) => {
      // Handle the error if any.
      if (err != null) {
        if (err.data) {
          this.setState({err: err.data.message});
        }
        return;
      }

      // Go to tasks when logged in.
      hashHistory.push('/tasks');
    });
  }

  handleChange(fieldName) {
    return (event) => {
      let state = {};
      state[fieldName] = event.target.value;
      this.setState(state);
    };
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