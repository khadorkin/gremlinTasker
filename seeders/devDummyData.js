'use strict';

require('babel-register');
require('babel-polyfill');

const models = require('./../models');
const Chance = require('chance');
const chance = new Chance();

function createComments(user, task) {
  models.comment.create({
    content: chance.paragraph(),
    userId: user.id,
    taskId: task.id
  });
}

function createTasks(numberOfTasks, user, board) {
  for (var i = 0; i < numberOfTasks; i++) {
    models.task.create({
      name: chance.sentence(),
      description: chance.paragraph(),
      isComplete: chance.bool(),
      priority: chance.natural({max: 1000}),
      difficulty: chance.natural({max: 1000}),
      dueDate: chance.date(),
      userId: user.id,
      boardId: board.id
    })
    .then( (task) => {
      createComments(user, task);
    });
  }
}

function createBoards(user) {
  for (var i = 0; i < 10; i++) {
    models.board.create({
      name: chance.sentence(),
      userId: user.id
    })
    .then( (board) => {
      createTasks(20, user, board);
    });
  }
}

models.user.create({
  username: 'admin',
  password: 'password',
  email: 'test@test.com'
})
.then( (user) => {
  createBoards(user);
});