const express = require("express");
const {
  createReview,
  getReviewByService,
  seedReviews,
  deleteReview,
} = require("../controllers/review");

const {
  createReviewValidation,
  deleteReviewValidation,
} = require("../validators/review");
const checkErrors = require("../validators/checkErrors");
const { auth } = require("../middleware/auth");
const router = express.Router();

router.post("/create", createReviewValidation, checkErrors, createReview);
router.post("/seed", seedReviews);
router.get("/:serviceId", getReviewByService);
router.delete(
  "/:reviewId",
  deleteReviewValidation,
  checkErrors,
  auth,
  (req, res, next) => {
    if (req.role !== "user") {
      return res.status(401).json({ status: "error", msg: "Not authorized" });
    }
    next();
  },
  deleteReview
);

module.exports = router;
