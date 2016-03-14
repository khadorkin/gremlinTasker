'use strict';

import React from 'react';
import { hashHistory } from 'react-router';
import ApiService from './../../middleware/apiService.jsx';

export default class RegisterForm extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      username: '',
      email: '',
      password: ''
    };

    this.ApiService = new ApiService();
  }

  handleSubmit(event) {
    event.preventDefault();
    this.ApiService.register(this.state, (err) => {
      if (err) {
        let state = this.state;
        state.error = err.data.message;
        this.setState(state);
        return;
      }
      hashHistory.push('login');
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
              type="text" id="usernameField"
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
        <div className="row mdl-textfield mdl-js-textfield mdl-cell--12-col">
          <input
              className="mdl-textfield__input"
              type="text"
              id="emailField"
              value={this.state.email}
              onChange={this.handleChange('email')}
          />
          <label
              className="mdl-textfield__label"
              htmlFor="emailField"
          >
            Email
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
            Register
          </button>
        </div>
      </form>
    );
  }
}