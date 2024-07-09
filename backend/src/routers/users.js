const express = require("express");
const router = express.Router();
const {
  getAllUsers,
  seedUsers,
  createBooking,
  deleteBooking,
  getUserById,
  changeUserInfo,
  getBookingsByUser,
} = require("../controllers/users");

router.get("/users/all", getAllUsers);
router.get("/:id", getUserById);
router.get("/seed", seedUsers);
router.put("/booking/:id", createBooking);
router.delete("/booking/:id", deleteBooking);
router.patch("/:id", changeUserInfo);
router.get("/booking/:id", getBookingsByUser);

module.exports = router;
