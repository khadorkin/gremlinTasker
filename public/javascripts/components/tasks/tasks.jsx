'use strict';

import React from 'react';

/**
 * This is the Tasks View Container.
 */
export default class Tasks extends React.Component {
  render() {
    return(
      <div className="mdl-grid" id="tasksView">
        {this.props.children}
      </div>
    );
  }
}