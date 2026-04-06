const express = require("express");
const protect = require("../middleware/authMiddleware");
const {
  createOrUpdateProfile,
  getMyProfile,
  searchDonors,
  getDonorById,
} = require("../controllers/donorController");

const router = express.Router();

router.post("/profile", protect, createOrUpdateProfile);
router.get("/profile/me", protect, getMyProfile);
router.get("/search", searchDonors);
router.get("/:id", getDonorById);

module.exports = router;
