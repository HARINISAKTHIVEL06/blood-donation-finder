const mongoose = require("mongoose");
const dotenv = require("dotenv");
const User = require("../src/models/User");

dotenv.config();

const mongoUri =
  process.env.MONGO_URI || "mongodb://127.0.0.1:27017/bloodDonationFinder";

const main = async () => {
  await mongoose.connect(mongoUri);

  const users = await User.find({}, "name email role createdAt")
    .sort({ createdAt: -1 })
    .lean();

  if (users.length === 0) {
    console.log("No users found.");
    return;
  }

  console.table(
    users.map((user) => ({
      id: String(user._id),
      name: user.name,
      email: user.email,
      role: user.role,
      createdAt: user.createdAt,
    }))
  );
};

main()
  .catch((error) => {
    console.error("Failed to list users:", error.message);
    process.exitCode = 1;
  })
  .finally(async () => {
    await mongoose.connection.close();
  });
