"use strict";

import express from 'express';
import User from './../models/user';

const router = express.Router();

/* GET the register webpage. */
router.get('/register', (req, res, next) => {
  res.render('user/register', {title: "yay"});
});

module.exports = router;
