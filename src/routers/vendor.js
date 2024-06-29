const express = require("express");
const { seedVendors } = require("../controllers/vendor");
const router = express.Router();

router.post("/seed", seedVendors);

module.exports = router;
