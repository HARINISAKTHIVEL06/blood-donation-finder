const mongoose = require("mongoose");

const donorProfileSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      unique: true,
    },
    bloodGroup: {
      type: String,
      required: true,
      enum: ["A+", "A-", "B+", "B-", "O+", "O-", "AB+", "AB-"],
    },
    phone: { type: String, required: true },
    city: { type: String, required: true },
    area: { type: String, required: true },
    lastDonatedDate: { type: Date },
    available: { type: Boolean, default: true },
  },
  { timestamps: true }
);

module.exports = mongoose.model("DonorProfile", donorProfileSchema);