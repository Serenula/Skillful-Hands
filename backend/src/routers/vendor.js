const express = require("express");
const { edit } = require("../controllers/vendor");
const { auth } = require("../middleware/auth");
const router = express.Router();

router.put("/edit", auth, edit);

module.exports = router;
