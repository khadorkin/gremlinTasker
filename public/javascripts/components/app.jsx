'use strict';

import React from 'react';

/**
 * This is the main app container that displays the webpage itself.
 */
export default class App extends React.Component {
  render() {
    return (
      <div>
        <div className="mdl-layout mdl-js-layout mdl-layout--fixed-drawer mdl-layout--fixed-header">
          {this.props.header}

          {this.props.sideNav}

          <main className="mdl-layout__content">
            <div className="page-content">
              {this.props.main}
            </div>
          </main>
        </div>
      </div>
    );
  }
}
