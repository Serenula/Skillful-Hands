const express = require("express");
const {
  createReview,
  getReviewByService,
  seedReviews,
  deleteReview,
} = require("../controllers/review");
const Auth = require("../model/Auth");
const {
  createReviewValidation,
  deleteReviewValidation,
} = require("../validators/review");
const checkErrors = require("../validators/checkErrors");
const router = express.Router();

router.post("/", createReviewValidation, checkErrors, createReview);
router.get("/:serviceId", getReviewByService);
router.post("/seed", seedReviews);
router.delete(
  "/delete/:id",
  deleteReviewValidation,
  checkErrors,
  Auth,
  (req, res, next) => {
    if (req.role !== "user") {
      return res.status(401).json({ status: "error", msg: "not authorized" });
    }
    next();
  },
  deleteReview
);

module.exports = router;
