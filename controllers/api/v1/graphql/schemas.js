'use strict';

/**
 * The Datamodel schemas.
 */
import {
  GraphQLBoolean,
  GraphQLInt,
  GraphQLList,
  GraphQLObjectType,
  GraphQLString
} from 'graphql';
import moment from 'moment';
import {
  tasks as tasksArgs,
  comments as commentsArgs,
  users as usersArgs,
  boards as boardsArgs
} from './queryFields';
import Db from './../../../../models';
import { buildQueryArgs } from './../../../../services/graphql/utilities';

export const Task = new GraphQLObjectType({
  name: 'Task',
  description: 'This represents a Task',
  fields() {
    return {
      id: {
        type: GraphQLInt,
        resolve(task) {
          return task.id;
        }
      },
      createdAt: {
        type: GraphQLString,
        resolve(task) {
          return moment(task.createdAt).format();
        }
      },
      updatedAt: {
        type: GraphQLString,
        resolve(task) {
          return moment(task.updatedAt).format();
        }
      },
      name: {
        type: GraphQLString,
        resolve(task) {
          return task.name;
        }
      },
      description: {
        type: GraphQLString,
        resolve(task) {
          return task.description;
        }
      },
      completedAt: {
        type: GraphQLString,
        resolve(task) {
          return moment(task.createdAt).format();
        }
      },
      isComplete: {
        type: GraphQLBoolean,
        resolve(task) {
          return task.isComplete;
        }
      },
      priority: {
        type: GraphQLInt,
        resolve(task) {
          return task.priority;
        }
      },
      difficulty: {
        type: GraphQLInt,
        resolve(task) {
          return task.difficulty;
        }
      },
      dueDate: {
        type: GraphQLString,
        resolve(task) {
          return moment(task.dueDate).format();
        }
      },
      userId: {
        type: GraphQLInt,
        resolve(task) {
          return task.userId;
        }
      },
      user: {
        type: User,
        resolve(task) {
          // for some reason, task.getUser() doesn't work.
          return Db.user.findById(task.userId);
        }
      },
      comments: {
        type: new GraphQLList(Comment),
        args: commentsArgs,
        resolve(task, args) {
          const query = buildQueryArgs(Db.task, args);
          return task.getComments(query);
        }
      }
    };
  }
});

export const MainUser = new GraphQLObjectType({
  name: 'MainUser',
  description: 'This represents the logged in user',
  fields() {
    return {
      id: {
        type: GraphQLInt,
        resolve (user) {
          return user.id;
        }
      },
      username: {
        type: GraphQLString,
        resolve (user) {
          return user.username;
        }
      },
      email: {
        type: GraphQLString,
        resolve (user) {
          return user.email;
        }
      },
      comments: {
        type: new GraphQLList(Comment),
        args: commentsArgs,
        resolve(user, args) {
          const query = buildQueryArgs(Db.task, args);
          return user.getComments(query);
        }
      },
      tasks: {
        type: new GraphQLList(Task),
        args: tasksArgs,
        resolve(user, args) {
          const query = buildQueryArgs(Db.task, args);
          return user.getTasks(query);
        }
      },
      boards: {
        type: new GraphQLList(Board),
        args: boardsArgs,
        resolve(user, args) {
          const query = buildQueryArgs(Db.board, args);
          return user.getBoards(query);
        }
      }
    };
  }
});

export const User = new GraphQLObjectType({
  name: 'User',
  description: 'This represents a User',
  fields() {
    return {
      id: {
        type: GraphQLInt,
        resolve (user) {
          return user.id;
        }
      },
      username: {
        type: GraphQLString,
        resolve (user) {
          return user.username;
        }
      }
    };
  }
});

export const Comment = new GraphQLObjectType({
  name: 'Comment',
  description: 'This represents a Comment',
  fields() {
    return {
      id: {
        type: GraphQLInt,
        resolve (comment) {
          return comment.id;
        }
      },
      createdAt: {
        type: GraphQLString,
        resolve (comment) {
          return moment(comment.createdAt).format();
        }
      },
      updatedAt: {
        type: GraphQLString,
        resolve (comment) {
          return moment(comment.createdAt).format();
        }
      },
      userId: {
        type: GraphQLInt,
        resolve (comment) {
          return comment.userId;
        }
      },
      taskId: {
        type: GraphQLInt,
        resolve (comment) {
          return comment.taskId;
        }
      },
      content: {
        type: GraphQLString,
        resolve (comment) {
          return comment.content;
        }
      },
      user: {
        type: User,
        resolve(comment) {
          return comment.getUser();
        }
      },
      task: {
        type: Task,
        resolve(comment) {
          return comment.getTask();
        }
      }
    };
  }
});

export const Board = new GraphQLObjectType({
  name: 'Board',
  description: 'This represents a Board',
  fields() {
    return {
      id: {
        type: GraphQLInt,
        resolve (comment) {
          return comment.id;
        }
      },
      createdAt: {
        type: GraphQLString,
        resolve (board) {
          return moment(board.createdAt).format();
        }
      },
      updatedAt: {
        type: GraphQLString,
        resolve (board) {
          return moment(board.createdAt).format();
        }
      },
      name: {
        type: GraphQLString,
        resolve (board) {
          return board.name;
        }
      },
      users: {
        type: new GraphQLList(User),
        args: usersArgs,
        resolve(board, args) {
          const query = buildQueryArgs(Db.user, args);
          return board.getUsers(query);
        }
      },
      tasks: {
        type: new GraphQLList(Task),
        args: tasksArgs,
        resolve(board, args) {
          args.boardId = board.id;
          const query = buildQueryArgs(Db.board, args);
          return board.getTasks(query);
        }
      }
    };
  }
});