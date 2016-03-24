'use strict';

import React from 'react';
import { render } from 'react-dom';
import { browserHistory } from 'react-router';
import ApiService from './../../middleware/apiService.jsx';

export default class BoardForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: ''
    };

    this.ApiService = new ApiService();

    // Bind state for custom methods.
    this.getBoard = this.getBoard.bind(this);
    this.prepareForm = this.prepareForm.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.createBoard = this.createBoard.bind(this);
    this.editBoard = this.editBoard.bind(this);
  }

  componentDidMount() {
    if (this.props.params.boardId) {
      // Load the tasks and set the state.
      this.getBoard(this.prepareForm);

      // Render the Title.
      render(
        <h3>Edit Board</h3>,
        document.getElementById('pageTitle')
      );
    } else {
      // Render the Title.
      render(
        <h3>Create Board</h3>,
        document.getElementById('pageTitle')
      );
    }
  }

  getBoard(callBack) {
    const query = `
      query {
        user {
          boards (id: ${this.props.params.boardId}) {
            id,
            name
          }
        }
      }
    `;

    // Run the query and call the callback.
    this.ApiService.graphQL(query, callBack);
  }

  prepareForm(err, response) {
    if (err) {
      return;
    }
    this.setState({
      name: response.data.user.boards[0].name
    });
  }

  handleSubmit(event) {
    event.preventDefault();

    let query = this.createBoard();
    if (this.props.params.boardId) {
      query = this.editBoard();
    }

    this.ApiService.graphQL(query.query, (err, response) => {
      // Handle the error if any.
      if (err != null) {
        if (err.data) {
          this.setState({err: err.data.message});
        }
        return;
      }

      // Go to the board when the board is created/edited.
      browserHistory.push(`/boards/${response.data[query.type].id}`);
    });
  }

  createBoard() {
    return {
      query: `
        mutation createBoard {
          createBoard (name: "${this.state.name}") {
            id
          }
        }
      `,
      type: 'createBoard'
    };
  }

  editBoard() {
    return {
      query: `
        mutation updateBoard {
          updateBoard (id: ${this.props.params.boardId} name: "${this.state.name}") {
            id
          }
        }
      `,
      type: 'updateBoard'
    };
  }

  handleChange(fieldName) {
    return (event) => {
      let state = {};
      state[fieldName] = event.target.value;
      this.setState(state);
    };
  }

  render() {
    return (
      <div
          className="app-content mdl-color--white mdl-shadow--4dp content mdl-color-text--grey-800 mdl-cell mdl-cell--8-col"
          id="boardForm"
      >
        <form action="" onSubmit={this.handleSubmit}>
          <p>
            {(() => {
              if (this.state.error) {
                return this.state.error;
              }
            })()}
          </p>
          <div className="row mdl-textfield mdl-js-textfield mdl-textfield--floating-label mdl-cell mdl-cell--12-col">
            <input
                className="mdl-textfield__input"
                type="text"
                id="nameField"
                value={this.state.name}
                onChange={this.handleChange('name')}
            />
            <label
                className="mdl-textfield__label"
                htmlFor="nameField"
            >
              Name
            </label>
          </div>
          <div className="mdl-cell--12-col mdl-textfield--align-right">
            <button
                type="submit"
                className="mdl-button mdl-js-button mdl-button--raised mdl-button--accent"
            >
              Submit
            </button>
          </div>
        </form>
      </div>
    );
  }
}
