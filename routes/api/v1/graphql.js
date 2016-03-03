"use strict";

/**
 * This is the GraphQL endpoint.
 */
import express from 'express';
import GraphHTTP from 'express-graphql';
import { userSessionMiddleware } from './../../../services/security/authService';
import { register, login, logout } from './../../../controllers/api/v1/users';
import Schema from './../../../controllers/api/v1/graphql';
const router = express.Router();

export default router;

router.use(
  '/api/v1/graphql',
  userSessionMiddleware,
  GraphHTTP( (req) => ({
    schema: Schema,
    rootValue: { session: req.session },
    pretty: true,
    graphiql: true
  }))
);
