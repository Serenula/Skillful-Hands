const express = require("express");
const {
  createReview,
  getReviewByService,
  seedReviews,
} = require("../controllers/review");
const router = express.Router;

router.post("/", createReview);
router.get("/:serviceId", getReviewByService);
router.post("/seed", seedReviews);

module.exports = router;
