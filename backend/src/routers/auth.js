const express = require("express");
const router = express.Router();
const {
  getAllUsers,
  register,
  login,
  refresh,
} = require("../controllers/auth");
const {
  validateRegistration,
  validateLogin,
  validateRefresh,
} = require("../validators/auth");
const checkErrors = require("../validators/checkErrors");
const { seedVendors } = require("../controllers/vendor");

router.get("/users", getAllUsers);
router.put("/register", validateRegistration, checkErrors, register);
router.post("/login", validateLogin, checkErrors, login);
router.post("/refresh", validateRefresh, checkErrors, refresh);
router.post("/seed", seedVendors);

module.exports = router;
