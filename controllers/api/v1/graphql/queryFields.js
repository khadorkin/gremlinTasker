'use strict';

/**
 * This will define the Query Fields part of the graphql.
 */
import {
  GraphQLBoolean,
  GraphQLInt,
  GraphQLString
} from 'graphql';

export const users = {
  id: {
    type: GraphQLInt
  },
  username: {
    typs: GraphQLString
  }
};

export const tasks = {
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
  },
  order: {
    type: GraphQLString
  },
  limit: {
    type: GraphQLInt
  },
  offset: {
    type: GraphQLInt
  }
};

export const comment = {
  id: {
    type: GraphQLInt
  }
};

export const comments = {
  id: {
    type: GraphQLInt
  },
  createdAt: {
    type: GraphQLString
  },
  updatedAt: {
    type: GraphQLString
  },
  userId: {
    type: GraphQLInt
  },
  taskId: {
    type: GraphQLInt
  },
  content: {
    type: GraphQLString
  }
};

export const boards = {
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
  }
};