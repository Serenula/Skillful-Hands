const express = require("express");
const {
  getAllServices,
  getServiceById,
  seedServices,
} = require("../controllers/service");
const router = express.Router();

router.post("/seed", seedServices);
router.get("/", getAllServices);
router.get("/:id", getServiceById);
router.put("/create");

module.exports = router;
