"use strict";

// Minimal Global settings, only should be the config, and the env.
GLOBAL.env = process.env.NODE_ENV || 'development';
GLOBAL.config = require('./config/config.json')[env];

import GraphHTTP from 'express-graphql';

const express = require('express');
const path = require('path');
const favicon = require('serve-favicon');
const logger = require('morgan');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const AuthService = require('./services/security/authService');

// Routes
const routes = require('./routes/index');
const users = require('./routes/users');
const apiV1Users = require('./routes/api/v1/users');
const apiV1Schema = require('./routes/api/v1/schema');

const app = express();

// Security Items
const helmet = require('helmet');
app.use(helmet.hidePoweredBy({setTo: 'A Toaster'}));

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// Main webpage routes.
app.use('/', routes);
app.use('/users', users);

// Api Routes.
// V1
app.use('/api/v1/users', apiV1Users);
app.use('/api/v1/graphql',
  AuthService.userSessionMiddleware,
  GraphHTTP((req) => ({
    schema: apiV1Schema,
    rootValue: { session: req.session },
    pretty: true
  })
)); // The graphql.


// catch 404 and forward to error handler
app.use((req, res, next) => {
  let err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use((err, req, res, next) => {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use((err, req, res, next) => {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});


module.exports = app;
