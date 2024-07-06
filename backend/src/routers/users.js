const express = require("express");
const router = express.Router();
const {
  getAllUsers,
  seedUsers,
  createBooking,
  deleteBooking,
} = require("../controllers/users");

router.get("/all", getAllUsers);
router.get("/seed", seedUsers);
router.put("/booking/:id", createBooking);
router.delete("/booking/:id", deleteBooking);

module.exports = router;
