'use strict';

import React from 'react';
import ReactDOM from 'react-dom';
import { Router, Route, IndexRoute, hashHistory } from 'react-router';

// Components
import App from './components/app.jsx';
import Register from './components/register/register.jsx';
import Login from './components/login/login.jsx';
import Tasks from './components/tasks/tasks.jsx';
import TaskList from './components/tasks/taskList.jsx';
import Task from './components/tasks/task.jsx';
import Home from './components/home.jsx';
import SideNav from './components/layout/sideNav.jsx';
import Header from './components/layout/header.jsx';

// The router.
ReactDOM.render(
  (
    <Router history={hashHistory} >
      <Route path="/"  component={App}>
        <IndexRoute components={{ main: Home, sideNav: SideNav, header: Header }} />
        <Route path="register" components={{ main: Register, sideNav: SideNav, header: Header }} />
        <Route path="login" components={{ main: Login, sideNav: SideNav, header: Header }} />
        <Route path="tasks" components={{ main: Tasks, sideNav: SideNav, header: Header }}>
          <IndexRoute component={TaskList} />
          <Route path=":id" component={Task} />
        </Route>
      </Route>
    </Router>
  ),
  document.getElementById('appContainer')
);