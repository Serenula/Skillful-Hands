const Vendor = require("../model/Vendor");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { v4: uuidv4 } = require("uuid");

const seedVendors = async (req, res) => {
  await Vendor.deleteMany({});

  try {
    await Vendor.create([
      {
        _id: "60d5ec49c45e2a001c8d2e21",
        username: "vendor1",
        email: "vendor1@example.com",
        password: await bcrypt.hash("password123", 12),
        category: "Cleaning",
      },
      {
        _id: "60d5ec49c45e2a001c8d2e22",
        username: "vendor2",
        email: "vendor2@example.com",
        password: await bcrypt.hash("password123", 12),
        category: "Aircon Servicing",
      },
      {
        _id: "60d5ec49c45e2a001c8d2e23",
        username: "vendor3",
        email: "vendor3@example.com",
        password: await bcrypt.hash("password123", 12),
        category: "Plumbing",
      },
    ]);

    res.json({ status: "ok", msg: "Seeding successful" });
  } catch (error) {
    console.error(error.message);
    res.status(400).json({ status: "error", msg: "Seeding error" });
  }
};

const register = async (req, res) => {
  try {
    console.log("Register request received:", req.body);

    const auth = await Vendor.findOne({ email: req.body.email });
    if (auth) {
      console.log("Duplicate email found:", req.body.email);
      return res.status(400).json({ status: "error", msg: "duplicate email" });
    }

    const hash = await bcrypt.hash(req.body.password, 12);
    console.log("Hashed password:", hash);

    const newVendor = await Vendor.create({
      username: req.body.username,
      email: req.body.email,
      password: hash,
      category: req.body.category,
    });
    console.log("Vendor created:", newVendor);

    res.json({ status: "ok", msg: "vendor created" });
  } catch (error) {
    console.error("Registration error:", error.message);
    res.status(400).json({ status: "error", msg: "invalid registration" });
  }
};

const login = async (req, res) => {
  try {
    console.log("Login request received:", req.body);

    const auth = await Vendor.findOne({ email: req.body.email });
    if (!auth) {
      console.log("No user found with email:", req.body.email);
      return res.status(401).json({ status: "error", msg: "not authorised" });
    }

    console.log("User found:", auth);
    console.log("Stored hashed password:", auth.password);

    console.log("Provided password:", req.body.password);
    console.log("Type of provided password:", typeof req.body.password);

    const result = await bcrypt.compare(req.body.password, auth.password);
    console.log("Password comparison result:", result);

    if (!result) {
      console.log("Email or password error");
      return res.status(401).json({ status: "error", msg: "login failed" });
    }

    const claims = {
      email: auth.email,
    };
    const access = jwt.sign(claims, process.env.ACCESS_SECRET, {
      expiresIn: "1d",
      jwtid: uuidv4(),
    });
    const refresh = jwt.sign(claims, process.env.REFRESH_SECRET, {
      expiresIn: "30d",
      jwtid: uuidv4(),
    });

    console.log("Tokens generated:", { access, refresh });

    res.json({ access, refresh });
  } catch (error) {
    console.error("Login error:", error.message);
    res.status(400).json({ status: "error", msg: "login failed" });
  }
};

module.exports = {
  seedVendors,
  register,
  login,
};
