'use strict';

import React from 'react';
import { browserHistory } from 'react-router';

export default class BasicCard extends React.Component {

  constructor(props) {
    super(props);

    // Bind this context for custom functions.
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick(event) {
    event.preventDefault();
    browserHistory.push(this.props.link);
  }

  render() {
    return (
      <div className="mdl-card mdl-shadow--4dp mdl-cell mdl-cell--4-col">
        <div className="mdl-card__title mdl-card--expand mdl-color--blue-grey mdl-color-text--white">
          <h2 className="mdl-card__title-text">{this.props.header}</h2>
        </div>
        <div className="mdl-card__supporting-text">
          {this.props.content}
        </div>
        <div className="mdl-card__actions mdl-card--border">
          <a onClick={this.handleClick}
              className="mdl-button mdl-button--colored mdl-js-button mdl-js-ripple-effect">
            {this.props.linkLabel}
          </a>
        </div>
      </div>
    );
  }
}