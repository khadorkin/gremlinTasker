'use strict';

import moment from 'moment';

export default function(sqlize, DataTypes) {

  // Define the task.
  let Task = sqlize.define('task', {
    userId: {
      type: DataTypes.BIGINT,
      allowNull: false,
      field: 'userId',
      validate: {
        notEmpty: true
      }
    },
    boardId: {
      type: DataTypes.BIGINT,
      allowNull: false,
      field: 'boardId',
      validate: {
        notEmpty: true
      }
    },
    name: {
      type: DataTypes.STRING,
      field: 'name',
      allowNull: false,
      unique: true,
      validate: {
        notEmpty: true
      }
    },
    description: {
      type: DataTypes.TEXT,
      field: 'description',
      allowNull: true,
      validate: {
        notEmpty: true
      }
    },
    completedAt: {
      type: DataTypes.DATE,
      field: 'completedAt',
      allowNull: true
    },
    isComplete: {
      type: DataTypes.BOOLEAN,
      field: 'isComplete',
      allowNull: true,
      set(val) {
        if (val) {
          this.setDataValue('completedAt', moment.utc().toDate());
        }
      }
    },
    priority: {
      type: DataTypes.BIGINT,
      field: 'priority',
      allowNull: true
    },
    difficulty: {
      type: DataTypes.BIGINT,
      field: 'difficulty',
      allowNull: true
    },
    dueDate: {
      type: DataTypes.DATE,
      field: 'dueDate',
      allowNull: true
    }
  }, {
    indexes: [
      {
        unique: true,
        fields: ['name']
      }
    ]
  }, {
    classMethods: {
      // Define the relationships
      associate(models) {
        Task.belongsTo(models.user);
        Task.belongsTo(models.board);
        Task.hasMany(models.comment, {as: 'comments'});
      }
    }
  });

  // Return the task.
  return Task;
}