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
      email: "",
      password: ""
    };
  },

  handleSubmit(event) {
    event.preventDefault();
    ApiService.register(this.state, (err, response) => {
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
            valueLink={this.linkState('username')} />
          <label
            className="mdl-textfield__label"
            for="usernameField">
            Username
          </label>
        </div>
        <div className="row mdl-textfield mdl-js-textfield mdl-cell--12-col">
          <input
            className="mdl-textfield__input"
            type="text"
            id="emailField"
            valueLink={this.linkState('email')} />
          <label
            className="mdl-textfield__label"
            for="emailField">
            Email
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
            Register
          </button>
        </div>
      </form>
    );
  }
});

export default React.createClass({
  componentDidMount() {
    // Bind the ApiService.
    ApiService = this.props.apiService;

    // This is needed because react-router + chrome prevents
    // the binding of onSubmit={this.handleSubmit}.
    render(
      <Form />,
      document.getElementById('registerForm')
    );

    // Update the page title.
    render(
      <h3>Register</h3>,
      document.getElementById('pageTitle')
    );
  },

  render() {

    return (
      <div id="registerForm" />
    );
  }
});
