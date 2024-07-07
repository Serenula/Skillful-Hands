const mongoose = require("mongoose");

const serviceSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    category: {
      type: String,
      required: true,
      enum: [
        "Cleaning",
        "Aircon Servicing",
        "Plumbing",
        "Pet Grooming",
        "Personal Training",
      ],
    },
    description: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    vendor: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Auth",
      required: true,
    },
    availability: [{ type: Date, required: true }],
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Service", serviceSchema);