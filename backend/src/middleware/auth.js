const jwt = require("jsonwebtoken");

const authUser = (req, res, next) => {
  if (!("authorization" in req.headers)) {
    return res.status(400).json({ status: "error", message: "token required" });
  }
  const token = req.headers["authorization"].replace("Bearer ", "");
  if (token) {
    try {
      const decoded = jwt.verify(token, process.env.ACCESS_SECRET);
      if (decoded.role === "user") {
        req.decoded = decoded;
        next();
      } else {
        throw new Error();
      }
    } catch (error) {
      console.error(error.message);
      res.status(401).json({ status: "error", message: "not authorised" });
    }
  } else {
    return res.status(403).json({ status: "error", message: "forbidden" });
  }
};

const authVendor = (req, res, next) => {
  if (!("authorization" in req.headers)) {
    return res.status(400).json({ status: "error", message: "token required" });
  }
  const token = req.headers["authorization"].replace("Bearer ", "");
  if (token) {
    try {
      const decoded = jwt.verify(token, process.env.ACCESS_SECRET);
      if (decoded.role === "vendor") {
        req.decoded = decoded;
        next();
      } else {
        throw new Error();
      }
    } catch (error) {
      console.error(error.message);
      res.status(401).json({ status: "error", message: "not authorised" });
    }
  } else {
    return res.status(403).json({ status: "error", message: "forbidden" });
  }
};

module.exports = { authUser, authVendor };
