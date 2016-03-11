'use strict';

import React from 'react';
import { hashHistory } from 'react-router';
import LinkedStateMixin from 'react-addons-linked-state-mixin';
import { register } from './../../middleware/apiService.jsx';

export default React.createClass({
  mixins: [LinkedStateMixin],

  getInitialState() {
    return {
      username: '',
      email: '',
      password: ''
    };
  },

  handleSubmit(event) {
    event.preventDefault();
    register(this.state, (err) => {
      if (err) {
        let state = this.state;
        state.error = err.data.message;
        this.setState(state);
        return;
      }
      hashHistory.push('login');
    });
  },

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
              valueLink={this.linkState('username')}
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
              valueLink={this.linkState('email')}
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
              valueLink={this.linkState('password')}
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
});