/**
 * This is the main app container that displays the webpage itself.
 */

import React from 'react';

export default React.createClass({
  render() {
    return (
      <div>
        <div className="mdl-layout mdl-js-layout mdl-layout--fixed-drawer mdl-layout--fixed-header">
          {this.props.header}

          {this.props.sideNav}

          <main className="mdl-layout__content">
            <div className="app-container">
              {this.props.main}
            </div>
          </main>
        </div>
      </div>
    );
  }
});
