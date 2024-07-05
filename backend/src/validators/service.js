const { body } = require("express-validator");

const createServiceValidation = [
  body("title", "Title is required").notEmpty().isString(),
  body("category", "Category is required").notEmpty().isString(),
  body("description", "Description is required").notEmpty().isString(),
  body("price", "Price is required and must be a number")
    .notEmpty()
    .isNumeric(),
  body(
    "availability",
    "Availability is required and must be an array with at least one date"
  )
    .notEmpty()
    .isArray({ min: 1 }),
];

module.exports = { createServiceValidation };
