'use strict';

import React from 'react';
import { render } from 'react-dom';
import _ from 'lodash';
import ApiService from './../../middleware/apiService.jsx';
import { browserHistory } from 'react-router';
import TaskListRow from './taskListRow.jsx';
import Rx from 'rx';
import { extract } from './../../lib/utils.jsx';

/**
 * This will build out a table for the tasks.
 */
export default class TaskList extends React.Component {

  constructor(props) {
    super(props);
    let state = {};
    state.tasks = [];
    _.merge(state, props);
    _.merge(state, props.params);
    this.state = state;

    this.ApiService = new ApiService();

    // Bind this context to custom functions.
    this.getTasks = this.getTasks.bind(this);
    this.processTasks = this.processTasks.bind(this);
  }

  componentDidMount() {
    // Load the tasks and set the state.
    this.getTasks();

    // Render the Title.
    render(
      <h3>Tasks</h3>,
      document.getElementById('pageTitle')
    );
  }

  getTasks() {
    // Build the GraphQL query to tasks list.
    let boardQuery = '';
    if (this.state.boardId) {
      boardQuery = `(id: ${this.state.boardId})`;
    }
    const query = `
      query {
        user {
          boards ${boardQuery} {
            id,
            tasks {
              id,
              name,
              dueDate,
              priority,
              difficulty,
              boardId
            }
          }
        }
      }
    `;

    // Run the query and get the tasks.
    const promise = this.ApiService.graphQL(query);
    const request = Rx.Observable.fromPromise(promise);

    request.subscribe(
      (response) => {
        // console.log(response);
        this.processTasks(response.data.data.user.boards);
      },
      (error) => {
        console.log(error);
        browserHistory.push('/login');
      }
    );
  }

  processTasks(boards) {
    // Combine all the tasks.
    // console.log(boards);
    let tasks = extract(boards, '*.tasks.*');
    this.setState({tasks: tasks});
  }

  buildTaskRow(task) {
    return <TaskListRow key={task.id} {...task} />;
  }

  render() {
    // Build out the table rows of tasks.
    const Tasks = this.state.tasks.map(this.buildTaskRow);

    return (
        <table className="mdl-cell mdl-cell--12-col mdl-shadow--4dp mdl-data-table mdl-js-data-table">
          <thead className="mdl-color--blue-grey">
            <tr>
              <th className="mdl-data-table__cell--non-numeric mdl-color-text--white">
                Task
              </th>
              <th className="mdl-data-table__cell--non-numeric mdl-color-text--white">
                Due Date
              </th>
              <th className="mdl-data-table__cell--non-numeric mdl-color-text--white">
                Difficulty
              </th>
              <th className="mdl-data-table__cell--non-numeric mdl-color-text--white">
                Prioity
              </th>
            </tr>
          </thead>
          <tbody id="taskList">
            {Tasks}
          </tbody>
        </table>
    );
  }
}
