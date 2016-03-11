import React from 'react';
import {render} from 'react-dom';
import ApiService from './../../middleware/apiService.jsx';
import {formatDisplayDate} from './../../lib/utils.jsx';

export default React.createClass({

  getInitialState() {
    return {};
  },

  componentDidMount() {
    // Fetch the task.
    this.getTask(this.props.params.id);

    // Render the title.
    render(
      <h3>Task</h3>,
      document.getElementById('pageTitle')
    );
  },

  getTask(taskId) {
    const query = `
      query {
        user {
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
            updatedAt
          }
        }
      }
    `;
    ApiService.graphQL(query, (err, response) => {
      if (response.data.user.tasks) {
        this.setState(response.data.user.tasks[0]);
      }
    });
  },

  render() {
    return(
      <div className="mdl-grid">
        <div className="app-content mdl-color--white mdl-shadow--4dp mdl-color-text--grey-800 mdl-cell mdl-cell--8-col">
          <div className="data-detail">
            <h4>Task: </h4>{this.state.name}
          </div>
          <div className="data-detail">
            <h4>Description: </h4>{this.state.description}
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
});