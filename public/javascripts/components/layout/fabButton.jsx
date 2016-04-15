'use strict';

import React from 'react';

export default class FabButton extends React.Component {
  render() {
    return (
      <button onClick={this.props.handleClick} className="mdl-button mdl-js-button mdl-button--fab mdl-js-ripple-effect mdl-button--colored mdl-shadow--4dp mdl-color--accent float float--bottom-right" id="add">
        <i className="material-icons" role="presentation">{this.props.icon}</i>
        <span className="visuallyhidden">{this.props.label}</span>
      </button>
    );
  }
}