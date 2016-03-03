"use strict";

// Minimal Global settings, only should be the config, and the env.
GLOBAL.env = process.env.NODE_ENV || 'development';
GLOBAL.config = require('./config/config.json')[env];

import GraphHTTP from 'express-graphql';

import express from 'express';
import path from 'path';
import favicon from 'serve-favicon';
import logger from 'morgan';
import cookieParser from 'cookie-parser';
import bodyParser from 'body-parser';
import helmet from 'helmet';

// Routes
import routes from './routes/index';
import apiV1Users from './routes/api/v1/users';
import apiV1Graphql from './routes/api/v1/graphql';

const app = express();

// Security Items
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

// Api Routes.
// V1
app.use(apiV1Users);
app.use(apiV1Graphql);


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
