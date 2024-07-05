const mongoose = require("mongoose");

const AuthSchema = new mongoose.Schema(
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
    hash: {
      type: String,
      required: true,
    },
    role: {
      type: String,
      enum: ["user", "vendor"],
      default: "user",
    },
    address: {
      type: String,
      required: function () {
        return this.role === "user";
      },
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
      required: function () {
        return this.role === "vendor";
      },
    },
    created_at: {
      type: Date,
      default: Date.now,
    },
  },
  {
    collection: "auth",
  }
);

module.exports = mongoose.model("Auth", AuthSchema);
