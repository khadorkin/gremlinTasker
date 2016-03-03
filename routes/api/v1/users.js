"use strict";

import express from 'express';
import { userSessionMiddleware } from './../../../services/security/authService';
import { register, login, logout } from './../../../controllers/api/v1/users';
const router = express.Router();

export default router;

/* Register a User */
router.post('/api/v1/users/register', register);

/* Log a User in. */
router.post('/api/v1/users/login', login);

/* Log the user out */
router.post(
  '/api/v1/users/logout',
  userSessionMiddleware,
  logout
);
