const DonorProfile = require("../models/DonorProfile");

const escapeRegex = (value) => value.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");

exports.createOrUpdateProfile = async (req, res) => {
  try {
    const { bloodGroup, phone, city, area, lastDonatedDate, available } = req.body;

    if (!bloodGroup || !phone || !city || !area) {
      return res.status(400).json({ message: "bloodGroup, phone, city, area are required" });
    }

    const update = {
      userId: req.user._id,
      bloodGroup,
      phone,
      city,
      area,
      lastDonatedDate: lastDonatedDate || null,
      available: available !== undefined ? available : true,
    };

    const profile = await DonorProfile.findOneAndUpdate(
      { userId: req.user._id },
      update,
      { upsert: true, new: true }
    ).populate("userId", "name email role");

    return res.status(200).json({ message: "Donor profile saved", profile });
  } catch (err) {
    return res.status(500).json({ message: "Server error", error: err.message });
  }
};

exports.getMyProfile = async (req, res) => {
  try {
    const profile = await DonorProfile.findOne({ userId: req.user._id }).populate(
      "userId",
      "name email role"
    );

    return res.json({ profile });
  } catch (err) {
    return res.status(500).json({ message: "Server error", error: err.message });
  }
};

exports.searchDonors = async (req, res) => {
  try {
    const { bloodGroup, city, area, location } = req.query;

    const filter = { available: true };
    if (bloodGroup) filter.bloodGroup = bloodGroup;

    if (location) {
      const locationRegex = new RegExp(escapeRegex(location), "i");
      filter.$or = [{ city: locationRegex }, { area: locationRegex }];
    } else {
      if (city) filter.city = new RegExp(escapeRegex(city), "i");
      if (area) filter.area = new RegExp(escapeRegex(area), "i");
    }

    const donors = await DonorProfile.find(filter)
      .populate("userId", "name email")
      .sort({ createdAt: -1 });

    return res.json({ count: donors.length, donors });
  } catch (err) {
    return res.status(500).json({ message: "Server error", error: err.message });
  }
};

exports.getDonorById = async (req, res) => {
  try {
    const donor = await DonorProfile.findById(req.params.id).populate("userId", "name email");

    if (!donor) {
      return res.status(404).json({ message: "Donor not found" });
    }

    return res.json({ donor });
  } catch (err) {
    return res.status(500).json({ message: "Server error", error: err.message });
  }
};
