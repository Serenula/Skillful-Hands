const { body, param } = require("express-validator");

const validateRegistration = [
  body("username", "username is required").notEmpty().isString(),
  body("email", "email is required").notEmpty().isString(),
  body("password", "password is required").notEmpty().isString(),
  body("role", "role is required").notEmpty().isString(),
  // body("address", "address is required").notEmpty().isString(),
];

const validateLogin = [
  body("email", "email is required").notEmpty().isString(),
  body("password", "password is required").notEmpty().isString(),
];

const validateRefresh = [
  body("refresh", "valid refresh token is required").notEmpty().isJWT(),
];

module.exports = { validateRegistration, validateLogin, validateRefresh };
