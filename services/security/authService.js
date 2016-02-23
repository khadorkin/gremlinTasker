"use strict";
const env = process.env.NODE_ENV || 'development';
const config = require(__dirname + './../../config/config.json')[env];
const db = require('./../../models/index');
const User = db.User;
const Redis = require('redis');
const Uuid = require('uuid');

/**
 * Saves/Updates a userSession.
 *
 * @param Object user A user boject.
 * @param Boolean keeplogedIn Whether or not to keep the session alive.
 * @param String uuid A session key if you want to update a session.
 * @return String The session key.
 */
exports.saveUserSession = function(user, keepLogedIn, uuid) {
  const client = getClient();

  delete user["password"];

  let session = {
    user: JSON.stringify(user),
    keeplogedIn: keepLogedIn
  }

  if (!uuid) {
    uuid = Uuid.v4();
  }

  client.HMSET(uuid, session, (err, res) => {
    if (!keepLogedIn) {
      client.expire(uuid, 3000);
    }

    client.end(true);
  });

  return uuid;
};

/**
 * Use this to autherize a user and save it to the session.
 *
 * @param Request req
 * @param Response res
 * @param function next
 */
exports.userSessionMiddleware = function(req, res, next) {
  let sessionId = req.get('authorization');
  if (!sessionId) {
    res.status(403).send({message: "Unathorized Access."});
    return;
  }

  const client = getClient();
  client.hgetall(sessionId, function(err, value) {
    if (err) {
      res.status(500).send(err);
      // return;
    }

    if (!value) {
      res.status(403).send({message: "Unathorized Access."});
      // return;
    }

    if (value.keepLogedIn) {
      client.PERSIST(uuid);
    }

    if (value) {
      value.user = JSON.parse(value.user);
      req.session = value;
      next();
    }
    client.end(true);
  });

};

/**
 * Build the redis client.
 * @return RedisClient
 */
function getClient() {
  return Redis.createClient(config['redis']['port'], config['redis']['host']);
}