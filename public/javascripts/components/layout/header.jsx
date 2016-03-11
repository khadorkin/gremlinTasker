import React from 'react';

export default React.createClass({
  render() {
    return (
      <header className="mdl-layout__header">
        <div className="mdl-layout__header-row">
          <div
              className="mdl-textfield mdl-textfield--align-left"
              id="pageTitle"
          />
          <div className="mdl-layout-spacer" />
          <div className="mdl-textfield mdl-js-textfield mdl-textfield--expandable mdl-textfield--floating-label mdl-textfield--align-right">
            <label
                className="mdl-button mdl-js-button mdl-button--icon"
                htmlFor="fixed-header-drawer-exp"
            />
            <i className="material-icons">search</i>
          </div>
          <div className="mdl-textfield__expandable-holder">
            <input
                className="mdl-textfield__input"
                type="text"
                name="search"
                id="fixed-header-drawer-exp"
            />
          </div>
        </div>
      </header>
    );
  }
});