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
const {
  validateCreateBookings,
  validateDeleteBookings,
  validateChangeUserInfo,
} = require("../validators/users");
const checkErrors = require("../validators/checkErrors");
const { auth } = require("../middleware/auth");

router.get("/users/all", getAllUsers);
router.get("/:id", getUserById);
router.get("/seed", seedUsers);
router.put(
  "/booking/:id",
  auth,
  validateCreateBookings,
  checkErrors,
  createBooking
);
router.delete(
  "/booking/:id",
  auth,
  validateDeleteBookings,
  checkErrors,
  deleteBooking
);
router.patch("/:id", auth, validateChangeUserInfo, checkErrors, changeUserInfo);
router.get("/booking/:id", auth, getBookingsByUser);

module.exports = router;
