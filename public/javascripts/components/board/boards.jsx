'use strict';

import React from 'react';

/**
 * This is the Boards view container.
 */
export default class Boards extends React.Component {
  render() {
    return (
      <div className="mdl-grid" id="boardsView">
        {this.props.children}
      </div>
    );
  }
}