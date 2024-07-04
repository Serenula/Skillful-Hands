const express = require("express");
const { seedVendors } = require("../controllers/vendor");
const { register, login } = require("../controllers/auth");
const router = express.Router();

router.post("/seed", seedVendors);
router.put("/register", register);
router.post("/login", login);

module.exports = router;
