/**
 * This is the main app container that displays the webpage itself.
 */

import React from 'react';
import {render} from 'react-dom';
import Immutable from 'immutable';
import SideNav from './sideNav.jsx';

export default React.createClass({
  buildState(props) {
    // Update the state.
    let state = Immutable.Map(props).toObject();
    this.setState(state);
    return state;
  },

  getInitialState() {
    return this.buildState(this.props);
  },

  componentDidUpdate() {
    // Update the state.
    this.buildState(this.state);
  },

  componentDidMount() {
    // update the state.
    this.buildState(this.props);
  },

  render() {
    return (
      <div className="mdl-layout mdl-js-layout mdl-layout--fixed-drawer mdl-layout--fixed-header">
        <header className="mdl-layout__header">
          <div className="mdl-layout__header-row">
            <div
              className="mdl-textfield mdl-textfield--align-left"
              id="pageTitle" />
            <div className="mdl-layout-spacer" />
            <div className="mdl-textfield mdl-js-textfield mdl-textfield--expandable mdl-textfield--floating-label mdl-textfield--align-right">
              <label
                className="mdl-button mdl-js-button mdl-button--icon"
                for="fixed-header-drawer-exp" />
              <i className="material-icons">search</i>
            </div>
            <div className="mdl-textfield__expandable-holder">
              <input
                className="mdl-textfield__input"
                type="text"
                name="search"
                id="fixed-header-drawer-exp" />
            </div>
          </div>
        </header>

        <div className="mdl-layout__drawer" id="sideNav">
          <span className="mdl-layout-title">Germlin Tasker</span>
          <SideNav {...this.state} />
        </div>

        <main className="mdl-layout__content">
          <div className="mdl-grid app-container">
            <div className="mdl-cell mdl-cell--2-col mdl-cell--hide-tablet mdl-cell--hide-phone" />
            <div className="app-content mdl-color--white mdl-shadow--4dp content mdl-color-text--grey-800 mdl-cell mdl-cell--8-col">
              {this.props.children}
            </div>
          </div>
        </main>
      </div>
    );
  }
});
