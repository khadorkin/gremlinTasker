import React from 'react';
import { render } from 'react-dom';
import { hashHistory } from 'react-router';
const LinkedStateMixin = require('react-addons-linked-state-mixin');

let ApiService = {};

const Form = React.createClass({
  mixins: [LinkedStateMixin],
  getInitialState() {
    return {
      username: "",
      password: ""
    };
  },

  handleSubmit(event) {
    event.preventDefault();

    ApiService.login(this.state, (err, response) => {
      if (err) {
        let state = this.state;
        state.error = err.data.message;
        this.setState(state);
        return;
      }
      hashHistory.push('/');
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
        <div className="mdl-cell--12-col mdl-textfield--align-right">
          <button
            type="submit"
            className="mdl-button mdl-js-button mdl-button--raised mdl-button--accent">
            Login
          </button>
        </div>
      </form>
    );
  }
});

module.exports = React.createClass({
  componentDidMount() {
    // Bind the API service.
    ApiService = this.props.apiService;

    // This is needed because react-router + chrome prevents
    // the binding of onSubmit={this.handleSubmit}.
    render(
      <Form />,
      document.getElementById('loginForm')
    );

    // Update the page title.
    render(
      <h3>Login</h3>,
      document.getElementById('pageTitle')
    );
  },

  render() {
    return (
      <div id="loginForm" />
    );
  }
});