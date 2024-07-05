const mongoose = require("mongoose");

const AuthSchema = new mongoose.Schema(
  {
    username: { type: String, required: true },
    email: { type: String, required: true },
    hash: { type: String, required: true },
    role: { type: String, enum: ["user", "vendor"], default: "user" },
    address: { type: String, required: true },
    created_at: { type: Date, default: Date.now },
  },
  { collection: "auth" }
);

module.exports = mongoose.model("Auth", AuthSchema);
