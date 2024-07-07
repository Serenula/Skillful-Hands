const Auth = require("../model/Auth");
const bcrypt = require("bcrypt");

const seedVendors = async (req, res) => {
  await Auth.deleteMany({ role: "vendor" });

  try {
    await Auth.create([
      {
        _id: "60d5ec49c45e2a001c8d2e21",
        username: "vendor1",
        email: "vendor1@example.com",
        hash: await bcrypt.hash("password123", 12),
        role: "vendor",
        address: "Vendor Address 1",
        category: "Cleaning",
      },
      {
        _id: "60d5ec49c45e2a001c8d2e22",
        username: "vendor2",
        email: "vendor2@example.com",
        hash: await bcrypt.hash("password123", 12),
        role: "vendor",
        address: "Vendor Address 2",
        category: "Aircon Servicing",
      },
      {
        _id: "60d5ec49c45e2a001c8d2e23",
        username: "vendor3",
        email: "vendor3@example.com",
        hash: await bcrypt.hash("password123", 12),
        role: "vendor",
        address: "Vendor Address 3",
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
