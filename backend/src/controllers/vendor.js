const { Vendor } = require("../model/Auth");
const bcrypt = require("bcrypt");

const seedVendors = async (req, res) => {
  await Vendor.deleteMany({});

  try {
    await Vendor.create([
      {
        _id: "60d5ec49c45e2a001c8d2e26",
        username: "vendor4",
        email: "vendor4@example.com",
        hash: await bcrypt.hash("password123", 12),
        role: "vendor",
        address: "Vendor Address 4",
        category: "Cleaning",
      },
      {
        _id: "60d5ec49c45e2a001c8d2e25",
        username: "vendor5",
        email: "vendor5@example.com",
        hash: await bcrypt.hash("password123", 12),
        role: "vendor",
        address: "Vendor Address 5",
        category: "Aircon Servicing",
      },
      {
        _id: "60d5ec49c45e2a001c8d2e24",
        username: "vendor6",
        email: "vendor6@example.com",
        hash: await bcrypt.hash("password123", 12),
        role: "vendor",
        address: "Vendor Address 6",
        category: "Plumbing",
      },
    ]);

    res.json({ status: "ok", msg: "Seeding successful" });
  } catch (error) {
    console.error(error.message);
    res.status(400).json({ status: "error", msg: "Seeding error" });
  }
};

module.exports = {
  seedVendors,
};
