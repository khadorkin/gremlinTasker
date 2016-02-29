import React from 'react';
const LinkedStateMixin = require('react-addons-linked-state-mixin');

module.exports = React.createClass({
  mixins: [LinkedStateMixin],
  getIntitalState() {
    return {
      username: "",
      password: ""
    }
  },
  render() {
    return (
      <div>
        <h3>Login</h3>
        <form action="#">
          <div className="row mdl-textfield mdl-js-textfield mdl-cell--12-col">
            <input className="mdl-textfield__input" type="text" id="usernameField" valueLink="{this.linkState('username')}" />
            <label className="mdl-textfield__label" for="usernameField">Username</label>
          </div>
          <div className="mdl-textfield mdl-js-textfield mdl-cell--12-col">
            <input className="mdl-textfield__input" type="password" id="passwordField" valueLink="{this.linkState('password')}" />
            <label className="mdl-textfield__label" for="passwordField">Password</label>
          </div>
        </form>
      </div>
    )
  }
});