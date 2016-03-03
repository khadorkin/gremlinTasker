"use strict";

/**
 * This will define the Query part of the graphql.
 */
import {
  GraphQLBoolean,
  GraphQLInt,
  GraphQLList,
  GraphQLNonNull,
  GraphQLString
} from 'graphql';
import Db from './../../../../models';
import { User, Task } from './schemas';
const fields = {};

export default fields;

// Build out the user query.
fields.user = {
  type: User,
  resolve (root, args, { rootValue: { session } }) {
    return Db.user.findById(session.user.id);
  }
};

// Build out the task query.
fields.task = {
  type: Task,
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
  type: new GraphQLList(Task),
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

