// const mongoose = require("mongoose");
// const Base = require("./Auth");

// const UserSchema = Base.discriminator(
//   "User",
//   new mongoose.Schema(
//     {
//       address: {
//         type: String,
//         required: true,
//       },

//       bookings: [
//         {
//           type: mongoose.Schema.Types.ObjectId,
//           ref: "bookings",
//         },
//       ],
//     },
//     { collection: "user" }
//   )
// );

// module.exports = mongoose.model("User");
