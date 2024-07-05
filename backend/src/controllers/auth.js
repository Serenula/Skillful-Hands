const Auth = require("../model/Auth");
const bcrypt = require("bcrypt");
const { validationResult } = require("express-validator");
const jwt = require("jsonwebtoken");
const { v4: uuidv4 } = require("uuid");

const getAllUsers = async (req, res) => {
  try {
    const users = await Auth.find().select("username email role address");
    res.json(users);
  } catch (error) {
    console.error(error.message);
    res.status(400).json({ status: "error", message: "error fetching users" });
  }
};

const register = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ status: "error", errors: errors.array() });
  }

  try {
    const { username, email, password, role, address, category } = req.body;

    const existingUser = await Auth.findOne({ email });
    if (existingUser) {
      return res
        .status(400)
        .json({ status: "error", message: "Email already in use" });
    }

    const hash = await bcrypt.hash(password, 12);

    let newUser;
    if (role === "user") {
      newUser = await Auth.create({
        username,
        email,
        hash,
        role,
        address,
      });
    } else if (role === "vendor") {
      newUser = await Auth.create({
        username,
        email,
        hash,
        role,
        category,
      });
    } else {
      return res.status(400).json({ status: "error", message: "Invalid role" });
    }

    res.json({ status: "ok", message: "User registered successfully" });
  } catch (error) {
    console.error(error.message);
    res.status(400).json({ status: "error", message: "Invalid registration" });
  }
};

const login = async (req, res) => {
  try {
    const auth = await Auth.findOne({ email: req.body.email });
    if (!auth) {
      return res
        .status(401)
        .json({ status: "error", message: "invalid email" });
    }
    const result = await bcrypt.compare(req.body.password, auth.hash);
    if (!result) {
      res.json({ status: "ok", message: "login failed" });
    }

    const claims = {
      username: auth.username,
      email: auth.email,
      role: auth.role,
      address: auth.address,
    };

    const access = jwt.sign(claims, process.env.ACCESS_SECRET, {
      expiresIn: "20m",
      jwtid: uuidv4(),
    });

    const refresh = jwt.sign(claims, process.env.REFRESH_SECRET, {
      expiresIn: "30d",
      jwtid: uuidv4(),
    });

    res.json({ access, refresh });
  } catch (error) {
    console.error(error.message);
    res.status(400).json({ status: "error", message: "login failed" });
  }
};

const refresh = async (req, res) => {
  try {
    const decoded = jwt.verify(req.body.refresh, process.env.REFRESH_SECRET);

    const claims = {
      username: decoded.username,
      email: decoded.email,
      role: decoded.role,
      address: decoded.address,
    };

    const access = jwt.sign(claims, process.env.ACCESS_SECRET, {
      expiresIn: "20m",
      jwtid: uuidv4(),
    });

    res.json(access);
  } catch (error) {
    console.error(error.message);
    res.status(400).json({ status: "error", msg: "refresh error" });
  }
};

module.exports = { register, login, refresh, getAllUsers };
