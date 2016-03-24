'use strict';

import React from 'react';
import { browserHistory } from 'react-router';
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
    browserHistory.push(`tasks/${this.props.id}`);
  }

  render() {
    let name = this.props.name;
    if (name.length > 27) {
      name = name.substring(0,27) + '...';
    }
    return(
      <tr onClick={this.viewTask}>
        <td className="mdl-data-table__cell--non-numeric">
          {name}
        </td>
        <td className="mdl-data-table__cell--non-numeric">
          {formatDisplayDate(this.props.dueDate)}
        </td>
        <td className="mdl-data-table__cell--non-numeric">
          {this.props.difficulty}
        </td>
        <td className="mdl-data-table__cell--non-numeric">
          {this.props.priority}
        </td>
      </tr>
    );
  }
}