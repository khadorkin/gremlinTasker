'use strict';

export default function(sqlize, DataTypes) {
  const Comment = sqlize.define('comment', {
    content: {
      type: DataTypes.TEXT,
      field: 'content',
      allowNull: false,
      unique: true,
      validate: {
        notEmpty: true
      }
    },
    userId: {
      type: DataTypes.BIGINT,
      allowNull: false,
      field: 'userId',
      validate: {
        notEmpty: true
      }
    },
    taskId: {
      type: DataTypes.BIGINT,
      allowNull: false,
      field: 'taskId',
      validate: {
        notEmpty: true
      }
    }
  },
  {}, {
    classMethods: {
      // Define the relationships
      associate(models) {
        Comment.belongsTo(models.task);
        Comment.belongsTo(models.user);
      }
    }
  });

  return Comment;
}