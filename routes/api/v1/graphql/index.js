'use strict';

const QueryFields = require('./query');
const MutationFields = require('./mutation');
const graphql = require('graphql');

const GraphQLObjectType = graphql.GraphQLObjectType;
const GraphQLSchema = graphql.GraphQLSchema;

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

module.exports = new GraphQLSchema({
  query: Query,
  mutation: Mutation
});