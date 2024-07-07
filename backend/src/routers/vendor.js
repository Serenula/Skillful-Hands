const express = require("express");
const { seedVendors, register, login } = require("../controllers/vendor");
const router = express.Router();

router.post("/seed", seedVendors);
router.put("/register", register);
router.post("/login", login);

module.exports = router;
