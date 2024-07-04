const mongoose = require("mongoose");

const vendorAuthSchema = new mongoose.Schema(
  {
    email: { type: String, required: true },
    hash: { type: String, required: true },
    created_at: { type: Date, default: Date.now },
  },
  { collection: "auth" }
);

module.exports = mongoose.model("VendorAuth", vendorAuthSchema);
