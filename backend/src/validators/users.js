const { body, param, check } = require("express-validator");

const validateCreateBookings = [
  body("title", "title is required").notEmpty().isString(),
  body("vendor", "vendor is required").notEmpty().isString(),
  body("price", "price is required").notEmpty().isInt(),
  check("id", "user id is required").notEmpty().isString(),
];

const validateDeleteBookings = [
  param("id", "user id is required").notEmpty().isString(),
];

const validateChangeUserInfo = [
  body("username", "title is required").notEmpty().isString(),
  body("email", "vendor is required").notEmpty().isString(),
  body("address", "price is required").notEmpty().isString(),
  param("id", "user id is required").notEmpty().isString(),
];

module.exports = {
  validateCreateBookings,
  validateDeleteBookings,
  validateChangeUserInfo,
};
