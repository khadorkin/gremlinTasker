'use strict'

const models = require('./../models');
const Chance = require('chance');
const chance = new Chance();

function createTasks(numberOfTasks, user) {
  let tasks = [];
  for (var i = 0; i < numberOfTasks; i++) {
    models.task.create({
      name: chance.string(),
      description: chance.paragraph(),
      isComplete: chance.bool(),
      priority: chance.integer(),
      difficulty: chance.integer(),
      dueDate: chance.date(),
      userId: user.id
    });
  }
}

models.user.create({
  username: 'admin',
  password: 'password',
  email: 'test@test.com',
})
.then( (user) => {
  createTasks(20, user);
});