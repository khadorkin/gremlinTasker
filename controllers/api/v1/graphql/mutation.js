'use strict';

import {
  GraphQLBoolean,
  GraphQLInt,
  GraphQLNonNull,
  GraphQLString
} from 'graphql';
import Db from './../../../../models';
import { Task, Board } from './schemas';
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
    },
    boardId: {
      type: GraphQLInt
    }
  },
  resolve (root, args, { rootValue: {session} }) {
    args.userId = session.user.id;
    return Db.task.create(args);
  }
};

fields.createBoard = {
  type: Board,
  args: {
    name: {
      type: new GraphQLNonNull(GraphQLString)
    }
  },
  resolve (root, args, { rootValue: {session} }) {
    return session.user.createBoard(args);
  }
};

fields.updateBoard = {
  type: Board,
  args: {
    id: {
      type: new GraphQLNonNull(GraphQLInt)
    },
    name: {
      type: new GraphQLNonNull(GraphQLString)
    }
  },
  resolve (root, args, { rootValue: {session} }) {
    return new Promise(
      (resolve) => {
        session.user.getBoards({where: { id: args.id }})
          .then( (boards) => {
            boards.forEach( (board) => {
              resolve(board.update({name: args.name}));
            });
          });
      }
    );
  }
};
