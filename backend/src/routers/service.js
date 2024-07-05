const express = require("express");
const {
  getAllServices,
  getServiceById,
  seedServices,
  createService,
} = require("../controllers/service");
const Auth = require("../model/Auth");
const { createServiceValidation } = require("../validators/service");
const checkErrors = require("../validators/checkErrors");
const router = express.Router();

router.post("/seed", seedServices);
router.get("/", getAllServices);
router.get("/:id", getServiceById);
router.post(
  "/create",
  createServiceValidation,
  checkErrors,
  Auth,
  (req, res, next) => {
    if (req.role !== "vendor") {
      return res.status(401).json({ status: "error", msg: "Not authorized" });
    }
    next();
  },
  createService
);

module.exports = router;
