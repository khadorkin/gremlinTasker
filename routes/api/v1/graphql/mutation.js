"use strict";

const graphql = require('graphql');
const Db = require('./../../../../models');
const Schemas = require('./schemas');

// The data types used.
const GraphQLBoolean = graphql.GraphQLBoolean;
const GraphQLInt = graphql.GraphQLInt;
const GraphQLNonNull = graphql.GraphQLNonNull;
const GraphQLObjectType = graphql.GraphQLObjectType;
const GraphQLString = graphql.GraphQLString;

let fields = {};

// Create and add a task for the user.
fields.addTask = {
  type: Schemas.Task,
  args: {
    name: {
      type: new GraphQLNonNull(GraphQLString)
    },
    description: {
      type: GraphQLString
    },
    completedAt: {
      type: GraphQLString
    },
    isComplete: {
      type: GraphQLBoolean
    },
    priority: {
      type: GraphQLInt
    },
    difficulty: {
      type: GraphQLInt
    },
    dueDate: {
      type: GraphQLString
    }
  },
  resolve (root, args, { rootValue: {session} }) {
    args.userId = session.user.id;
    return Db.task.create(args);
  }
};

module.exports = fields;