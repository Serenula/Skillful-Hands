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
        category: "Cleaning",
        aboutUs: "Cleaning company",
      },
      {
        _id: "60d5ec49c45e2a001c8d2e25",
        username: "vendor5",
        email: "vendor5@example.com",
        hash: await bcrypt.hash("password123", 12),
        role: "vendor",
        category: "Aircon Servicing",
        aboutUs: "Aircon company",
      },
      {
        _id: "60d5ec49c45e2a001c8d2e24",
        username: "vendor6",
        email: "vendor6@example.com",
        hash: await bcrypt.hash("password123", 12),
        role: "vendor",
        category: "Plumbing",
        aboutUs: "Plumbing company",
      },
    ]);

    res.json({ status: "ok", msg: "Seeding successful" });
  } catch (error) {
    console.error(error.message);
    res.status(400).json({ status: "error", msg: "Seeding error" });
  }
};

const edit = async (req, res) => {
  const { aboutUs } = req.body;
  try {
    const vendor = await Vendor.findById(req.user.id);

    if (!vendor) {
      return res
        .status(404)
        .json({ status: "Not Found", msg: "Vendor not found" });
    }

    vendor.aboutUs = aboutUs;
    await vendor.save();

    res.status(200).json({ status: "ok", msg: "Updated successfully" });
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ status: "error", msg: "Server error" });
  }
};

module.exports = {
  seedVendors,
  edit,
};
