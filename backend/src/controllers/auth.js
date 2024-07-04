const authModel = require("../model/Auth");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { v4: uuidv4 } = require("uuid");

//this is all users including users and vendors
const getAllUsers = async (req, res) => {
  try {
    const users = await authModel.find().select("username email role address");
    res.json(users);
  } catch (error) {
    console.error(error.message);
    res.status(400).json({ status: "error", message: "error fetching users" });
  }
};

const register = async (req, res) => {
  try {
    const auth = await authModel.findOne({ email: req.body.email });
    if (auth) {
      return res.status(400).json({ status: "error", message: "email in use" });
    }
    const hash = await bcrypt.hash(req.body.password, 12);
    await authModel.create({
      username: req.body.username,
      email: req.body.email,
      hash,
      role: req.body.role,
      address: req.body.address,
    });
    res.json({ status: "ok", message: "user registered" });
  } catch (error) {
    console.error(error.message);
    res.status(400).json({ status: "error", message: "invalid registration" });
  }
};

const login = async (req, res) => {
  try {
    const auth = await authModel.findOne({ email: req.body.email });
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
