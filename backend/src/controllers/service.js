const mongoose = require("mongoose");
const Service = require("../model/Service");
const Vendor = require("../model/Vendor");

const seedServices = async (req, res) => {
  await Service.deleteMany({});

  try {
    const vendors = await Vendor.find();

    if (vendors.length === 0) {
      return res.status(400).json({
        status: "error",
        msg: "No vendors found. Please seed vendors first.",
      });
    }

    await Service.create([
      {
        _id: "60d5ec49c45e2a001c8d2e23",
        name: "House Cleaning",
        category: "Cleaning",
        description: "House cleaning service",
        price: 50,
        provider: vendors[0]._id, // Assign the first vendor
        availability: [new Date("2024-07-01"), new Date("2024-07-02")],
      },
      {
        _id: "60d5ec49c45e2a001c8d2e24",
        name: "Car Cleaning",
        category: "Cleaning",
        description: "Car cleaning service",
        price: 30,
        provider: vendors[1]._id, // Assign the second vendor
        availability: [new Date("2024-07-03"), new Date("2024-07-04")],
      },
      {
        _id: "60d5ec49c45e2a001c8d2e25",
        name: "Pet Sitting",
        category: "Pet Sitting",
        description: "Pet sitting service",
        price: 20,
        provider: vendors[2]._id, // Assign the third vendor
        availability: [new Date("2024-07-05"), new Date("2024-07-06")],
      },
    ]);

    res.json({ status: "ok", msg: "Seeding successful" });
  } catch (error) {
    console.error(error.message);
    res.status(400).json({ status: "error", msg: "Seeding error" });
  }
};

const getAllServices = async (req, res) => {
  try {
    const services = await Service.find().populate("vendor", "username");
    res.json(services);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getServiceById = async (req, res) => {
  try {
    const service = await Service.findById(req.params.id).populate(
      "provider",
      "username"
    );
    if (!service) {
      return res.status(404).json({ message: "Service not found" });
    }
    res.jeson(service);
  } catch (error) {
    res.stauts(500).json({ message: error.message });
  }
};

const createService = async (req, res) => {
  try {
    const { title, description, price, availability } = req.body;
    const vendorId = req.vendorId;

    const vendor = await Vendor.findById(vendorId);

    if (!vendor) {
      console.log("Vendor not found in database for ID:", vendorId);
      return res.status(404).json({ status: "error", msg: "Vendor not found" });
    }

    const newService = new Service({
      title,
      category: vendor.category,
      description,
      price,
      vendor: vendor._id,
      availability,
    });

    const savedService = await newService.save();
    res
      .status(201)
      .json({ status: "ok", msg: "Service created", service: savedService });
  } catch (error) {
    console.error("Error creating service:", error.message);
    res.status(500).json({ status: "error", msg: "Failed to create service" });
  }
};

const deleteService = async (req, res) => {
  try {
    const serviceId = req.params.id;
    const vendorId = req.vendorId;
    const service = await Service.findById(serviceId);

    if (!mongoose.Types.ObjectId.isValid(serviceId)) {
      return res
        .status(404)
        .json({ status: "error", msg: "Service not found" });
    }

    if (service.vendor.toString() !== vendorId.toString()) {
      return res.status(403).json({ status: "error", msg: "Not authorized" });
    }

    await service.deleteOne();

    res.status(200).json({ status: "ok", msg: "Service deleted" });
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ status: "error", msg: "Failed to delete service" });
  }
};

module.exports = {
  seedServices,
  getAllServices,
  getServiceById,
  createService,
  deleteService,
};
