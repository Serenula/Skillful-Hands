const Review = require("../model/Review");
const Service = require("../model/Service");
const Auth = require("../model/Auth");

const createReview = async (req, res) => {
  const { serviceId, userId, rating, comment } = req.body;

  try {
    const service = await Service.findById(serviceId);
    if (!service) {
      return res.status(404).json({ message: "Service not found" });
    }

    const newReview = await Review.create({
      service: serviceId,
      user: userId,
      rating,
      comment,
    });

    res
      .status(201)
      .json({ message: "Review created successfully", review: newReview });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error creating review", error: error.message });
  }
};

const getReviewByService = async (req, res) => {
  const { serviceId } = req.params;

  try {
    const reviews = await Review.find({ service: serviceId }).populate(
      "user",
      "username"
    );
    res.json(reviews);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error getting reviews", error: error.message });
  }
};

const seedReviews = async (req, res) => {
  await Review.deleteMany({});

  try {
    const services = await Service.find();
    const users = await Auth.find({ role: "user" });

    if (services.length === 0 || users.length === 0) {
      return res
        .status(400)
        .json({ message: "No services or users. Please seed first" });
    }

    const reviews = [
      {
        service: services[0]._id,
        user: users[0]._id,
        rating: 4,
        comment: "Great service, highly recommended!",
      },
      {
        service: services[1]._id,
        user: users[1]._id,
        rating: 5,
        comment: "Excellent job, very professional!",
      },
      {
        service: services[2]._id,
        user: users[2]._id,
        rating: 3,
        comment: "Good service, but could be better.",
      },
    ];

    await Review.insertMany(reviews);

    res.status(201).json({ message: "Review data seeded successfully" });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error seeding reviews", error: error.message });
  }
};

const deleteReview = async (req, res) => {
  const { reviewId } = req.params;
  const userId = req.userVendorId;

  try {
    console.log("User Vendor ID:", userId);

    const review = await Review.findById(reviewId);
    console.log("Review:", review);

    if (!review) {
      return res.status(404).json({ message: "Review not found" });
    }

    console.log("Review user ID:", review.user);

    if (review.user.toString() !== userId.toString()) {
      return res
        .status(403)
        .json({ message: "You are not authorized to delete this review" });
    }

    await Review.findByIdAndDelete(reviewId);

    res.status(200).json({ message: "Review deleted successfully" });
  } catch (error) {
    console.error("Error deleting review:", error.message);
    res
      .status(500)
      .json({ message: "Error deleting review", error: error.message });
  }
};

module.exports = {
  createReview,
  getReviewByService,
  seedReviews,
  deleteReview,
};
