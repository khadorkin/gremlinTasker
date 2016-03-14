'use strict';

import React from 'react';
import { render } from 'react-dom';
import { hashHistory } from 'react-router';
import BasicCard from './../layout/basicCard.jsx';
import ApiService from './../../middleware/apiService.jsx';

export default class BoardList extends React.Component {

  constructor(props) {
    super(props);
    this.state = { boards: [] };

    this.ApiService = new ApiService();

    // Bind this context to custom functions.
    this.displayBoards = this.displayBoards.bind(this);
    this.getBoards = this.getBoards.bind(this);
  }

  componentDidMount() {
    // Load the tasks and set the state.
    this.getBoards(this.displayBoards);

    // Render the Title.
    render(
      <h3>Boards</h3>,
      document.getElementById('pageTitle')
    );
  }

    /**
   * Process the response from the getTasks function and
   * display all the tasks.
   */
  displayBoards(err, response) {
    if (err) {
      return hashHistory.push('/login');
    }

    // Set the state for display.
    this.setState({boards: response.data.user.boards});
  }

  getBoards(callBack) {
    const query = `
      query {
        user {
          boards {
            id,
            name
          }
        }
      }
    `;

    // Run the query and call the callback.
    this.ApiService.graphQL(query, callBack);
  }

  buildBoards(board) {
    const params = {
      key: board.id,
      header: board.name,
      link: `/boards/${board.id}`,
      linkLabel: 'View Tasks'
    };
    return <BasicCard {...params} />;
  }
  render() {
    const Cards = this.state.boards.map(this.buildBoards);

    return (
      <div className="mdl-grid">
        {Cards}
      </div>
    );
  }
}