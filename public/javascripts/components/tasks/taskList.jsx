'use strict';

import React from 'react';
import { render } from 'react-dom';
import { graphQL } from './../../middleware/apiService.jsx';
import { hashHistory } from 'react-router';
import TaskListRow from './taskListRow.jsx';

export default React.createClass({

  getInitialState() {
    return {
      tasks: []
    };
  },

  componentDidMount() {
    this.getTasks();

    // Render the title.
    render(
      <h3>Tasks</h3>,
      document.getElementById('pageTitle')
    );
  },

  getTasks() {
    // Build the GraphQL query to tasks list.
    const query = `
      query {
        user{
          tasks {
            id,
            name,
            dueDate,
            priority,
            difficulty
          }
        }
      }
    `;

    // Run the query and update the state.
    graphQL(query, (err, response) => {
      if (err) {
        return hashHistory.push('/login');
      }
      this.setState(response.data.user);
    });
  },

  buildTaskRow(task) {
    return <TaskListRow key={task.id} {...task} />;
  },

  render() {
    // Build out the table rows of tasks.
    const Tasks = this.state.tasks.map(this.buildTaskRow);

    return (
      <table className="mdl-data-table mdl-js-data-table mdl-shadow--4dp">
        <thead>
          <tr>
            <th className="mdl-data-table__cell--non-numeric">
              Task
            </th>
            <th className="mdl-data-table__cell--non-numeric">
              Due Date
            </th>
            <th>
              Difficulty
            </th>
            <th>
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
});