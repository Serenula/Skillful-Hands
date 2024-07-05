const Service = require("../model/Service");
const Auth = require("../model/Auth");

const seedServices = async (req, res) => {
  await Service.deleteMany({});

  try {
    const vendors = await Auth.find({ role: "vendor" });

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
        provider: vendors[0]._id,
        availability: [new Date("2024-07-01"), new Date("2024-07-02")],
      },
      {
        _id: "60d5ec49c45e2a001c8d2e24",
        name: "Aircon man ",
        category: "Aircon Services",
        description: "aircon cleaning service",
        price: 30,
        provider: vendors[1]._id,
        availability: [new Date("2024-07-03"), new Date("2024-07-04")],
      },
      {
        _id: "60d5ec49c45e2a001c8d2e25",
        name: "Pet Grooming",
        category: "Pet grooming",
        description: "Pet grooming service",
        price: 20,
        provider: vendors[2]._id,
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
    res.json(service);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const createService = async (req, res) => {
  try {
    const newService = {
      name: req.body.name,
      category: req.body.category,
      description: req.body.description,
      price: req.body.price,
      availability: req.body.availability,
      provider: req.body.provider,
    };
    await Service.create(newService);
    res.json({ status: "ok", msg: "Service saved" });
  } catch (error) {
    console.error(error.message);
    res.json({ status: "error", msg: "Error saving service" });
  }
};

module.exports = {
  seedServices,
  getAllServices,
  getServiceById,
  createService,
};
