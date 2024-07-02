const Review = require("../model/Review");
const Service = require("../model/Service");

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
    const users = await User.find();

    if (services.length === 0 || user.length === 0) {
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
module.exports = { createReview, getReviewByService, seedReviews };
