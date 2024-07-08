const { User } = require("../model/Auth");
const Bookings = require("../model/Bookings");

const seedUsers = async (req, res) => {
  try {
    await User.deleteMany({});
    await User.create({
      _id: "64d0f3f75676c304033d8c89",
      username: "user123",
      email: "user123@gmail.com",
      hash: "123",
      role: "user",
      type: "User",
      address: "address123",
    });
    res.json({ status: "ok", msg: "seeding successful" });
  } catch (error) {
    console.error(error.message);
    res.status(400).json({ status: "error", message: "error seeding users" });
  }
};

const getAllUsers = async (req, res) => {
  try {
    const allUsers = await User.find();
    console.log(allUsers);
    res.json(allUsers);
  } catch (error) {
    console.error(error.message);
    res.status(400).json({ status: "error", message: "error getting users" });
  }
};

const getUserById = async (req, res) => {
  try {
    const user = await User.findById(req.params.id).populate("bookings").exec();
    res.json(user);
  } catch (error) {
    console.error(error.message);
    res
      .status(400)
      .json({ status: "error", message: "error getting user details" });
  }
};

const changeUserInfo = async (req, res) => {
  try {
    const user = await User.findByIdAndUpdate(req.params.id, {
      username: req.body.username,
      email: req.body.email,
      address: req.body.address,
    });
    res.json({ status: "ok", message: "user info changed" });
  } catch (error) {
    console.error(error.message);
    res
      .status(400)
      .json({ status: "error", message: "error changing user details" });
  }
};

const createBooking = async (req, res) => {
  try {
    const booking = await Bookings.create({
      title: req.body.title,
      category: req.body.category,
      description: req.body.description,
      vendor: req.body.vendor,
      price: req.body.price,
      date: req.body.date,
      time: req.body.time,
      user: req.params.id,
    });

    const user = await User.findById(req.params.id);
    user.bookings.push(booking._id);
    await user.save();

    res.json({ status: "ok", message: "booking successful" });
  } catch (error) {
    console.error(error.message);
    res
      .status(400)
      .json({ status: "error", message: "error creating booking" });
  }
};

const deleteBooking = async (req, res) => {
  try {
    await Bookings.findByIdAndDelete(req.params.id);
    const user = await User.findById(req.body.id);
    user.bookings.pull({ _id: req.params.id });
    await user.save();

    console.log(user);
    res.json({ status: "ok", message: " booking cancelled" });
  } catch (error) {
    console.error(error.message);
    res
      .status(400)
      .json({ status: "error", message: "error deleting booking" });
  }
};

module.exports = {
  getAllUsers,
  seedUsers,
  getUserById,
  createBooking,
  deleteBooking,
  changeUserInfo,
};
