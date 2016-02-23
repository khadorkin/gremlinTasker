"use strict";

import {
  GraphQLObjectType,
  GraphQLString,
  GraphQLInt,
  GraphQLSchema,
  GraphQLList,
  GraphQLNonNull
} from 'graphql';

const Db = require('./../../../models');

/**
 * User datamodel.
 */
const User = new GraphQLObjectType({
  name: 'User',
  description: 'This represents a User',
  fields: () => {
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
      }
    };
  }
});

/**
 * The main query.
 */
const Query = new GraphQLObjectType({
  name: 'Query',
  description: 'Root query object',
  fields: () => {
    return {
      user: {
        type: User,
        resolve (root, args, { rootValue: { session } }) {
          return Db.user.findById(session.user.id);
        }
      }
    };
  }
});

const Schema = new GraphQLSchema({
  query: Query
});

module.exports = Schema;