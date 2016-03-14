'use strict';

import React from 'react';
import { hashHistory } from 'react-router';
import { formatDisplayDate } from './../../lib/utils.jsx';

export default class TaskListRow extends React.Component {

  constructor(props) {
    super(props);

    // Bind this context to custom methods.
    this.viewTask = this.viewTask.bind(this);
  }

  /**
   * Handles the onClick event to display the
   * task details.
   */
  viewTask() {
    hashHistory.push(`tasks/${this.props.id}`);
  }

  render() {
    return(
      <tr onClick={this.viewTask}>
        <td className="mdl-data-table__cell--non-numeric">
          {this.props.name}
        </td>
        <td className="mdl-data-table__cell--non-numeric">
          {formatDisplayDate(this.props.dueDate)}
        </td>
        <td>
          {this.props.difficulty}
        </td>
        <td>
          {this.props.priority}
        </td>
      </tr>
    );
  }
}