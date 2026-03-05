const express = require("express");
const protect = require("../middleware/authMiddleware");
const {
  createOrUpdateProfile,
  searchDonors,
  getDonorById,
} = require("../controllers/donorController");

const router = express.Router();

router.post("/profile", protect, createOrUpdateProfile);
router.get("/search", searchDonors);
router.get("/:id", getDonorById);

module.exports = router;