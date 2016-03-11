'use strict';

import React from 'react';
import { hashHistory } from 'react-router';
import LinkedStateMixin from 'react-addons-linked-state-mixin';
import { login } from './../../middleware/apiService.jsx';

export default React.createClass({
  mixins: [LinkedStateMixin],

  getInitialState() {
    return {
      username: '',
      password: ''
    };
  },

  handleSubmit(event) {
    event.preventDefault();

    login(this.state, (err) => {
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
            Login
          </button>
        </div>
      </form>
    );
  }
});