const { check } = require('express-validator');

const createTaskValidator = () => [
  check('taskName', 'Task Name không được để trống').not().isEmpty(),
  check('taskDescription', 'Task Description không được để trống').not().isEmpty(),
];

module.exports = { createTaskValidator };
