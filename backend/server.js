require("dotenv").config();

const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const rateLimit = require("express-rate-limit");
const serviceRoutes = require("./src/routers/service");
const reviewRoutes = require("./src/routers/review");
const auth = require("./src/routers/auth");
const users = require("./src/routers/users");
const vendor = require("./src/routers/vendor");

const connectDB = require("./src/db/db");
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100,
  standardHeaders: true,
  legacyHeaders: false,
});

connectDB();

const app = express();
//middleware starts here
app.use(cors());
app.use(helmet());
app.use(limiter);
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
//router starts here

app.use("/api/services", serviceRoutes);
app.use("/api/review", reviewRoutes);
app.use("/api/auth", auth);
app.use("/api/users", users);
app.use("api/vendor", vendor);
// app.use("/api/reviews", reviewRoutes);

const PORT = process.env.PORT || 5001;
app.listen(PORT, () => {
  console.log(`Server sarterd on ${PORT}`);
});
