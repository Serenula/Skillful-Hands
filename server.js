require("dotenv").config();

const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const rateLimit = require("express-rate-limit");

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
const PORT = process.env.PORT || 5001;
app.listen(PORT, () => {
  console.log(`Server sarterd on${PORT}`);
});
