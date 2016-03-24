'use strict';

import React from 'react';
import { render } from 'react-dom';
import { browserHistory } from 'react-router';
import _ from 'lodash';
import ApiService from './../../middleware/apiService.jsx';
import {formatDisplayDate} from './../../lib/utils.jsx';

/**
 * This will display a single Task.
 */
export default class Task extends React.Component {

  constructor(props) {
    super(props);
    let state = {};
    state.comments = [];
    _.merge(state, props);
    this.state = state;

    this.ApiService = new ApiService();

    // Bind this context to custom methods.
    this.getTask = this.getTask.bind(this);
  }

  componentDidMount() {
    // Fetch the task.
    this.getTask(this.state.params.id);

    // Render the title.
    render(
      <h3>Task</h3>,
      document.getElementById('pageTitle')
    );
  }

  /**
   * This will get a single task from the server.
   *
   * @param {int} taskId.
   */
  getTask(taskId) {
    const query = `
      query {
        user {
          boards {
            tasks (id: ${taskId}) {
              id,
              name,
              description,
              difficulty,
              priority,
              isComplete,
              completedAt,
              dueDate,
              createdAt,
              updatedAt,
              comments {
                id,
                content,
                user {
                  id,
                  username
                }
              }
            }
          }
        }
      }
    `;

    this.ApiService.graphQL(query, (err, response) => {
      if (err) {
        browserHistory.push('/login');
        return;
      }

      const task = _.find(
        response.data.user.boards,
        (board) => {
          return _.size(board.tasks) > 0;
        }
      );
      if (task) {
        this.setState(task.tasks[0]);
      }
    });
  }

  buildComments(comment) {
    return (
      <li key={comment.id} className="mdl-list__item mdl-list__item--three-line">
        <span className="mdl-list__item-primary-content">
          <span>{comment.user.username}:</span>
          <span className="mdl-list__item-text-body">{comment.content}</span>
        </span>
      </li>
    );
  }

  render() {
    const Comments = this.state.comments.map(this.buildComments);
    return(
      <div className="mdl-grid">
        <div className="app-content mdl-color--white mdl-shadow--4dp mdl-color-text--grey-800 mdl-cell mdl-cell--8-col">
          <div className="data-detail">
            <h4>Task: </h4>{this.state.name}
          </div>
          <div className="data-detail">
            <h4>Description: </h4>{this.state.description}
          </div>
          <div className="data-detail">
            <h4>Comments: </h4>
            <ul className="mdl-list">
              {Comments}
            </ul>
          </div>
        </div>
        <div className="app-content mdl-color--white mdl-shadow--4dp mdl-color-text--grey-800 mdl-cell mdl-cell--4-col">
          <div className="data-detail">
            <h4>Due Date: </h4>{formatDisplayDate(this.state.dueDate)}
          </div>
          <div className="data-detail">
            <h4>Created At: </h4>{formatDisplayDate(this.state.createdAt)}
          </div>
          <div className="data-detail">
            <h4>Difficulty: </h4>{this.state.difficulty ? this.state.difficulty : 0}
          </div>
          <div className="data-detail">
            <h4>Priority: </h4>{this.state.priority ? this.state.priority : 0}
          </div>
        </div>
      </div>
    );
  }
}