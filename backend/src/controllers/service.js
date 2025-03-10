const Service = require("../model/Service");
const { Vendor } = require("../model/Auth");

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

    console.log(vendors);

    await Service.create([
      {
        _id: "60d5ec49c45e2a001c8d2e23",
        name: "House Cleaning",
        category: "Cleaning",
        description: "House cleaning service",
        price: 50,
        vendor: vendors[0]._id,
        availability: [new Date("2024-07-01"), new Date("2024-07-02")],
      },
      {
        _id: "60d5ec49c45e2a001c8d2e24",
        name: "Aircon man ",
        category: "Aircon Servicing",
        description: "aircon cleaning service",
        price: 30,
        vendor: vendors[1]._id,
        availability: [new Date("2024-07-03"), new Date("2024-07-04")],
      },
      {
        _id: "60d5ec49c45e2a001c8d2e25",
        name: "Pet Grooming",
        category: "Pet Grooming",
        description: "Pet grooming service",
        price: 20,
        vendor: vendors[2]._id,
        availability: [new Date("2024-07-05"), new Date("2024-07-06")],
      },
    ]);

    res.json({ status: "ok", msg: "Seeding successful" });
  } catch (error) {
    console.error(error.message);
    res.status(400).json({ status: "error", msg: "Seeding error" });
  }
};
const createService = async (req, res) => {
  const { name, description, price, availability } = req.body;
  const vendorId = req.userVendorId;
  try {
    const vendor = await Vendor.findById(vendorId);
    if (!vendor) {
      return res.status(404).json({ msg: "Vendor not found" });
    }
    const category = vendor.category;

    const newService = new Service({
      name,
      category,
      description,
      price,
      vendor: vendorId,
      availability,
    });
    await Service.create(newService);
    res.json({ status: "ok", msg: "Service saved" });
  } catch (error) {
    console.error(error.message);
    res.json({ status: "error", msg: "Error saving service" });
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
    const service = await Service.findById(req.params.serviceId)
      .populate("vendor", "username aboutUs")
      .populate("reviews");
    console.log(service);
    if (!service) {
      return res.status(404).json({ message: "Service not found" });
    }
    res.json(service);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getVendorServices = async (req, res) => {
  const { vendorId } = req.params;
  try {
    const services = await Service.find({ vendor: vendorId });

    res.status(200).json(services);
  } catch (error) {
    console.error("Error", error.message);
    res.status(500).json({ status: "error", msg: "internal server error" });
  }
};

const deleteService = async (req, res) => {
  const { serviceId } = req.params;
  const vendorId = req.userVendorId;

  try {
    const service = await Service.findById(serviceId);

    if (!service) {
      return res.status(404).json({ message: "Service not found" });
    }

    console.log("Service vendor ID:", service.vendor.toString());
    console.log("User vendor ID:", vendorId.toString());

    if (service.vendor.toString() !== vendorId.toString()) {
      return res
        .status(403)
        .json({ message: "You are not authorized to delete this service" });
    }

    await Service.findByIdAndDelete(serviceId);
    res.status(200).json({ message: "Service deleted successfully" });
  } catch (error) {
    console.error(error.message);
    res
      .status(500)
      .json({ message: "Error deleting service", error: error.message });
  }
};

module.exports = {
  seedServices,
  getAllServices,
  getServiceById,
  createService,
  deleteService,
  getVendorServices,
};
