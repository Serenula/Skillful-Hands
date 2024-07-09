const express = require("express");
const {
  getAllServices,
  getServiceById,
  seedServices,
  createService,
  deleteService,
  getVendorServices,
} = require("../controllers/service");
const { createServiceValidation } = require("../validators/service");
const checkErrors = require("../validators/checkErrors");
const { auth } = require("../middleware/auth");
const router = express.Router();

router.post("/seed", seedServices);
router.delete(
  "/:serviceId",
  auth,
  (req, res, next) => {
    if (req.role !== "vendor") {
      return res.status(401).json({ status: "error", msg: "Not authorized" });
    }
    next();
  },
  deleteService
);
router.get("/", getAllServices);
router.get("/:vendorId", getVendorServices);
router.post("/:serviceId", getServiceById);
router.post(
  "/create",
  createServiceValidation,
  checkErrors,
  auth,
  (req, res, next) => {
    if (req.role !== "vendor") {
      return res.status(401).json({ status: "error", msg: "Not authorized" });
    }
    next();
  },
  createService
);

module.exports = router;
