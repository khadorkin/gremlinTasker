"use strict";

const graphql = require('graphql');
const Db = require('./../../../../models');
const Schemas = require('./schemas');

// The data types used.
const GraphQLBoolean = graphql.GraphQLBoolean;
const GraphQLInt = graphql.GraphQLInt;
const GraphQLNonNull = graphql.GraphQLNonNull;
const GraphQLString = graphql.GraphQLString;
const GraphQLList = graphql.GraphQLList;

let fields = {};

// Build out the user query.
fields.user = {
  type: Schemas.User,
  resolve (root, args, { rootValue: { session } }) {
    return Db.user.findById(session.user.id);
  }
};

// Build out the task query.
fields.task = {
  type: Schemas.Task,
  args: {
    id: {
      type: GraphQLInt
    }
  },
  resolve (root, args, { rootValue: {session} }) {
    args.userId = session.user.id;
    return Db.task.findOne({where: args});
  }
};

// Build out the Tasks query.
fields.tasks = {
  type: new GraphQLList(Schemas.Task),
  args: {
    id: {
      type: GraphQLInt
    },
    createdAt: {
      type: GraphQLString
    },
    updatedAt: {
      type: GraphQLString
    },
    name: {
      type: GraphQLString
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
    return Db.task.findAll({where: args});
  }
};

module.exports = fields;
