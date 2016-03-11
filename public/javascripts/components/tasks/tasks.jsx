'use strict';

import React from 'react';

export default React.createClass({
  render() {
    return(
      <div className="app-content content mdl-color-text--grey-800" id="taskView">
        {this.props.children}
      </div>
    );
  }
});