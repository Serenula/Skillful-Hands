const mongoose = require("mongoose");

const BookingsSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    // category: {
    //   type: String,
    //   required: true,
    // },
    // description: {
    //   type: String,
    //   required: true,
    // },
    vendor: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    date: {
      type: Date,
      required: true,
    },
    // time: {
    //   type: String,
    //   required: true,
    // },
    status: {
      type: String,
      enum: ["completed", "upcoming"],
      default: "upcoming",
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  { collection: "bookings" }
);

module.exports = mongoose.model("Bookings", BookingsSchema);
