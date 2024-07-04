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
    const services = await Service.find().populate("provider", "username");
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

    // Log decoded token for debugging
    console.log("Decoded token:", req.decoded);

    // Ensure correct token decoding and vendor ID extraction
    const vendorId = req.decoded.vendorId;

    // Find vendor by ID
    const vendor = await Vendor.findById(vendorId);

    if (!vendor) {
      console.log("Vendor not found in database for ID:", vendorId);
      return res.status(404).json({ status: "error", msg: "Vendor not found" });
    }

    // Create new service associated with the vendor
    const newService = new Service({
      title,
      category: vendor.category,
      description,
      price,
      vendor: vendor._id,
      availability,
    });

    // Save the new service
    const savedService = await newService.save();

    // Respond with success message and created service data
    res
      .status(201)
      .json({ status: "ok", msg: "Service created", service: savedService });
  } catch (error) {
    console.error("Error creating service:", error.message);
    res.status(500).json({ status: "error", msg: "Failed to create service" });
  }
};

module.exports = {
  seedServices,
  getAllServices,
  getServiceById,
  createService,
};
