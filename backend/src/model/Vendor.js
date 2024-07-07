const mongoose = require("mongoose");

const vendorSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    category: {
      type: String,
      enum: [
        "Cleaning",
        "Aircon Servicing",
        "Plumbing",
        "Pet Grooming",
        "Personal Training",
      ],
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Vendor", vendorSchema);
