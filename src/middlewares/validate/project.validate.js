const { check } = require('express-validator');

const createProjectValidator = () => [
  check('projectName', 'Project Name không được để trống').not().isEmpty(),
  check('projectDescription', 'Project Description không được để trống').not().isEmpty(),
];

module.exports = { createProjectValidator };
