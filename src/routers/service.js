const express = require("express");
const {
  getAllServices,
  getServiceById,
  seedServices,
  createService,
} = require("../controllers/service");
const { fetchVendor } = require("../middleware/vendorAuth");
const router = express.Router();

router.post("/seed", seedServices);
router.get("/", getAllServices);
router.get("/:id", getServiceById);
router.post("/create", fetchVendor, createService);

module.exports = router;
