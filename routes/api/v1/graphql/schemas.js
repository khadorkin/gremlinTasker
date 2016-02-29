"use strict";

const graphql = require('graphql');
const moment = require('moment');

// The data types used.
const GraphQLBoolean = graphql.GraphQLBoolean;
const GraphQLInt = graphql.GraphQLInt;
const GraphQLNonNull = graphql.GraphQLNonNull;
const GraphQLObjectType = graphql.GraphQLObjectType;
const GraphQLString = graphql.GraphQLString;
const GraphQLList = graphql.GraphQLList;



let Task = new GraphQLObjectType({
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
      user: {
        type: User,
        resolve(task) {
          return task.getUser();
        }
      }
    };
  }
});

let User = new GraphQLObjectType({
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
      },
      email: {
        type: GraphQLString,
        resolve (user) {
          return user.email;
        }
      },
      tasks: {
        type: new GraphQLList(Task),
        resolve (user) {
          return user.tasks;
        }
      }
    };
  }
});

exports.Task = Task;
exports.User = User;