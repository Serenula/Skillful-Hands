const Vendor = require("../model/Vendor");
const bcrypt = require("bcrypt");

const seedVendors = async (req, res) => {
  await Vendor.deleteMany({});

  try {
    await Vendor.create([
      {
        _id: "60d5ec49c45e2a001c8d2e21",
        username: "vendor1",
        email: "vendor1@example.com",
        password: await bcrypt.hash("password123", 10),
      },
      {
        _id: "60d5ec49c45e2a001c8d2e22",
        username: "vendor2",
        email: "vendor2@example.com",
        password: await bcrypt.hash("password123", 10),
      },
      {
        _id: "60d5ec49c45e2a001c8d2e23",
        username: "vendor3",
        email: "vendor3@example.com",
        password: await bcrypt.hash("password123", 10),
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
