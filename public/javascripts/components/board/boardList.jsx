'use strict';

import React from 'react';
import { render } from 'react-dom';
import { browserHistory } from 'react-router';
import Rx from 'rx';
import BasicCard from './../layout/basicCard.jsx';
import FabButton from './../layout/fabButton.jsx';
import { setPageTitle } from './../layout/pageTitle.jsx';
import ApiService from './../../middleware/apiService.jsx';

export default class BoardList extends React.Component {

  constructor(props) {
    super(props);
    this.state = { boards: [] };

    this.ApiService = new ApiService();

    // Bind this context to custom functions.
    this.getBoards = this.getBoards.bind(this);
  }

  componentDidMount() {
    // Load the tasks and set the state.
    this.getBoards();

    // Render the Title.
    setPageTitle('Boards');

    // Add the Create Button.
    render(
      <FabButton handleClick={this.createBoard} icon="add" label="Add"  />,
      document.getElementById('buttonHolder')
    );
  }

  componentWillUnmount() {
    render(
      <div />,
      document.getElementById('buttonHolder')
    );
  }

  getBoards() {
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
    const promise = this.ApiService.graphQL(query);
    const request = Rx.Observable.fromPromise(promise);
    request.subscribe(
      (response) => {
        // Set the state for display.
        this.setState({boards: response.data.data.user.boards});
      },
      (response) => {
        console.log(response);
        return browserHistory.push('/login');
      }
    );
  }

  createBoard() {
    browserHistory.push('/boards/create');
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
