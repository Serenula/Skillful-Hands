const express = require("express");
const {
  getAllServices,
  getServiceById,
  seedServices,
  createService,
} = require("../controllers/service");
const { authVendor } = require("../middleware/vendorAuth");
const router = express.Router();

router.post("/seed", seedServices);
router.get("/", getAllServices);
router.get("/:id", getServiceById);
router.post("/create", authVendor, createService);

module.exports = router;
