const { check } = require("express-validator");

const createColumnValidator = () => [
  check("titleColumn", "title Column không được để trống").not().isEmpty(),
];

module.exports = { createColumnValidator };
