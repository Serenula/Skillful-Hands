const jwt = require("jsonwebtoken");
const Auth = require("../model/Auth");

const auth = async (req, res, next) => {
  console.log("Request Headers:", req.headers);

  if (!req.headers.authorization) {
    console.log("Authorization header missing");
    return res.status(400).json({ status: "error", msg: "Token required" });
  }

  const token = req.headers.authorization.replace("Bearer ", "");
  console.log("Extracted token:", token);

  try {
    const decoded = jwt.verify(token, process.env.ACCESS_SECRET);
    console.log("Token decoded:", decoded);
    req.decoded = decoded;

    const userVendor = await Auth.findOne({ email: decoded.email });

    if (!userVendor) {
      return res
        .status(404)
        .json({ status: "error", msg: "User or Vendor not found" });
    }

    if (decoded.role === "user" || decoded.role === "vendor") {
      req.userVendorId = userVendor._id;
      req.role = decoded.role;
      next();
    } else {
      return res.status(401).json({ status: "error", msg: "Not authorized" });
    }
  } catch (error) {
    console.error("JWT verification error:", error.message);
    return res.status(401).json({ status: "error", msg: "Not authorized" });
  }
};

module.exports = { auth };
