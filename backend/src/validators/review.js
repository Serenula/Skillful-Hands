const { body } = require("express-validator");

const createReviewValidation = [
  body("serviceId", "Service ID is required").notEmpty().isString(),
  body("userId", "User ID is Required").notEmpty().isString(),
  body("rating", "Rating is required and must be a number between 1 and 5")
    .notEmpty()
    .isInt({ min: 1, max: 5 }),
  body("comment", "Comment is required").notEmpty().isString(),
];

const deleteReviewValidation = [
  body("reviewId", "Review ID is required").notEmpty().isString(),
];

module.exports = { createReviewValidation, deleteReviewValidation };
