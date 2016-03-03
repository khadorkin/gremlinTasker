"use strict";

import {
  GraphQLBoolean,
  GraphQLInt,
  GraphQLNonNull,
  GraphQLObjectType,
  GraphQLString
} from 'graphql';
import Db from './../../../../models';
import { Task } from './schemas';
let fields = {};

export default fields;

// Create and add a task for the user.
fields.addTask = {
  type: Task,
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
