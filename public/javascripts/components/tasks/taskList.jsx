'use strict';

import React from 'react';
import { render } from 'react-dom';
import _ from 'lodash';
import ApiService from './../../middleware/apiService.jsx';
import { hashHistory } from 'react-router';
import TaskListRow from './taskListRow.jsx';

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
    this.displayTasks = this.displayTasks.bind(this);
    this.getTasks = this.getTasks.bind(this);
  }

  componentDidMount() {
    // Load the tasks and set the state.
    this.getTasks(this.displayTasks);

    // Render the Title.
    render(
      <h3>Tasks</h3>,
      document.getElementById('pageTitle')
    );
  }

  /**
   * Process the response from the getTasks function and
   * display all the tasks.
   */
  displayTasks(err, response) {
    if (err) {
      return hashHistory.push('/login');
    }

    // Combine all the tasks.
    let tasks = _.reduce(
      response.data.user.boards,
      (carry, value) => {
        value.tasks.forEach((task) => {
          carry.push(task);
        });
        return carry;
      },
      []
    );

    // Make sure there are not duplicates.
    // tasks = _.uniqWith(tasks, _.isEqual);

    // Set the state for display.
    this.setState({tasks: tasks});
  }

  getTasks(callBack) {
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

    // Run the query and call the callback.
    this.ApiService.graphQL(query, callBack);
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
              <th className="mdl-data-table__cell--non-numericS mdl-color-text--white">
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
