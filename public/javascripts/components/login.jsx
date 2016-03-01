import React from 'react';
import { render } from 'react-dom'
const LinkedStateMixin = require('react-addons-linked-state-mixin');

const Form = React.createClass({
  mixins: [LinkedStateMixin],
  getInitialState() {
    return {
      username: "",
      password: ""
    };
  },

  handleSubmit(e) {
    e.preventDefault();
    // TODO: Process the login.
    console.log(this.state);
  },

  render() {
    return (
      <form action="" onSubmit={this.handleSubmit}>
        <div className="row mdl-textfield mdl-js-textfield mdl-cell--12-col">
          <input
            className="mdl-textfield__input"
            type="text" id="usernameField"
            valueLink={this.linkState('username')} />
          <label
            className="mdl-textfield__label"
            for="usernameField">
            Username
          </label>
        </div>
        <div className="mdl-textfield mdl-js-textfield mdl-cell--12-col">
          <input
            className="mdl-textfield__input"
            type="password"
            id="passwordField"
            valueLink={this.linkState('password')} />
          <label
            className="mdl-textfield__label"
            for="passwordField">
            Password
          </label>
        </div>
        <button
          type="submit"
          className="mdl-button mdl-js-button mdl-button--raised mdl-button--accent">
          Login
        </button>
      </form>
    );
  }
});

module.exports = React.createClass({
  componentDidMount() {
    // This is needed because react-router + chrome prevents
    // the binding of onSubmit={this.handleSubmit}.
    render(
      <Form />,
      document.getElementById('loginForm')
    );
  },

  render() {
    return (
      <div>
        <h3>Login</h3>
        <div id="loginForm" />
      </div>
    );
  }
});