'use strict';

import React from 'react';
import Links from './sidenavLinks.jsx';

export default React.createClass({
  render() {
    return (
      <div className="mdl-layout__drawer" id="sideNav">
        <span className="mdl-layout-title">Germlin Tasker</span>
        <Links />
      </div>
    );
  }
});