const jwt = require("jsonwebtoken");

const authVendor = (req, res, next) => {
  console.log("Request Headers:", req.headers);

  if (!req.headers.authorization) {
    console.log("Authorization header missing");
    return res.status(400).json({ status: "error", msg: "token required" });
  }

  const token = req.headers.authorization.replace("Bearer ", "");
  console.log("Extracted token:", token);

  try {
    const decoded = jwt.verify(token, process.env.ACCESS_SECRET);
    console.log("Token decoded:", decoded);
    req.decoded = decoded;
    next();
  } catch (error) {
    console.error("JWT verification error:", error.message);
    return res.status(401).json({ status: "error", msg: "not authorized" });
  }
};

module.exports = { authVendor };
