'use strict';

import QueryFields from './query';
import MutationFields from './mutation';
import {GraphQLObjectType, GraphQLSchema} from 'graphql';

/**
 * The main query.
 */
const Query = new GraphQLObjectType({
  name: 'Query',
  description: 'Root query object',
  fields() {
    return QueryFields;
  }
});

/**
 * The mutation query.
 */
const Mutation = new GraphQLObjectType({
  name: 'Mutations',
  description: 'Saving of data',
  fields() {
    return MutationFields;
  }
});

export default new GraphQLSchema({
  query: Query,
  mutation: Mutation
});
