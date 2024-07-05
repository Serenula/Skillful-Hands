const Auth = require("../model/Auth");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { v4: uuidv4 } = require("uuid");

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

const register = async (req, res) => {
  try {
    console.log("Register request received:", req.body);

    const userVendor = await Auth.findOne({ email: req.body.email });
    if (userVendor) {
      console.log("Duplicate email found:", req.body.email);
      return res.status(400).json({ status: "error", msg: "duplicate email" });
    }

    const hash = await bcrypt.hash(req.body.password, 12);
    console.log("Hashed password:", hash);

    const newVendor = await Auth.create({
      username: req.body.username,
      email: req.body.email,
      hash: hash,
      role: "vendor",
      address: req.body.address,
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

    const userVendor = await Auth.findOne({ email: req.body.email });
    if (!userVendor) {
      console.log("No user found with email:", req.body.email);
      return res.status(401).json({ status: "error", msg: "not authorised" });
    }

    console.log("User found:", userVendor);
    console.log("Stored hashed password:", userVendor.hash);

    console.log("Provided password:", req.body.password);
    console.log("Type of provided password:", typeof req.body.password);

    const result = await bcrypt.compare(req.body.password, userVendor.hash);
    console.log("Password comparison result:", result);

    if (!result) {
      console.log("Email or password error");
      return res.status(401).json({ status: "error", msg: "login failed" });
    }

    const claims = {
      email: userVendor.email,
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
