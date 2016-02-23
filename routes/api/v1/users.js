"use strict";

const express = require('express');
const router = express.Router();
const db = require('./../../../models');
const User = db.user;
const AuthService = require('./../../../services/security/authService');

/* Register a User */
router.post('/register', (req, res, next) => {
  User.create(req.body)
    .then( (user) => {
      res.status(201).send({message: 'success'});
    })
    .catch( (errors) => {
      res.status(500).send(errors);
    });
});

/* Log a User in. */
router.post('/login', (req, res, next) => {
  User.findOne({
    where: { username: req.body.username }
  })
  .then( (user) => {
    user.checkPassword(req.body.password, (err, isMatch) => {

      // If error report back.
      if (err) {
        console.log(error);
        res.status(500).send({message: "Something Broke."});
        res.status(500).send(err);
        return;
      }

      // If a match, save it to the redis as a session and return the
      // session id.
      if (isMatch) {
        let uuid = AuthService.saveUserSession(
          user,
          req.body.keepLogedIn,
          req.get('authorization')
        );
        res.send({session_id: uuid});
        return;
      }

      // Report if the password is a failure.
      if (!isMatch) {
        res.status(403)
          .send({password: "Incorrect Password."});
        return;
      }

    });
  })
  .catch( (error) => {
    if (error) {
      console.log(error);
      res.status(500).send({message: "Something Broke."});
    }
  });
});

/* Log the user out */
router.post('/logout', (req, res, next) => {
  AuthService.deleteuserSession(req.get('authorization'));
});

module.exports = router;