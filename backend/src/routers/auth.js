const express = require("express");
const router = express.Router();
const {
  getAllUsers,
  register,
  login,
  refresh,
  getUserVendorProfile,
} = require("../controllers/auth");
const {
  validateRegistration,
  validateLogin,
  validateRefresh,
} = require("../validators/auth");
const checkErrors = require("../validators/checkErrors");
const { seedVendors } = require("../controllers/vendor");
const { auth } = require("../middleware/auth");

router.get("/users", getAllUsers);
router.put("/register", validateRegistration, checkErrors, register);
router.post("/login", validateLogin, checkErrors, login);
router.post("/refresh", validateRefresh, checkErrors, refresh);
router.post("/seed", seedVendors);
router.get("/profile", auth, getUserVendorProfile);

module.exports = router;
