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
      required: true,
    },
    created_at: { type: Date, default: Date.now },
  },
  { collection: "auth", discriminatorKey: "type" }
);

const Auth = mongoose.model("Auth", AuthSchema);

const UserSchema = new mongoose.Schema({
  address: {
    type: String,
    required: true,
  },

  bookings: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Bookings",
    },
  ],
});

const User = Auth.discriminator("User", UserSchema);

const VendorSchema = new mongoose.Schema({
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
  aboutUs: {
    type: String,
    required: true,
  },
});

const Vendor = Auth.discriminator("Vendor", VendorSchema);

module.exports = { Auth, User, Vendor };
