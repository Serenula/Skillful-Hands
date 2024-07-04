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
    const newService = {
      service_name: req.body.title,
      service_type: req.body.author,
      service_price: req.body.year,
    };
    await Service.create(newService);
    res.json({ status: "ok", msg: "service saved" });
  } catch (error) {
    console.error(error.message);
    res.json({ status: "error", msg: "error saving service" });
  }
};
module.exports = {
  seedServices,
  getAllServices,
  getServiceById,
  createService,
};
