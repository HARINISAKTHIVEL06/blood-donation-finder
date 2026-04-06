const bcrypt = require("bcryptjs");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const User = require("../src/models/User");

dotenv.config();

const mongoUri =
  process.env.MONGO_URI || "mongodb://127.0.0.1:27017/bloodDonationFinder";

const [, , nameArg, emailArg, passwordArg] = process.argv;

const name = nameArg || "Admin";
const email = emailArg;
const password = passwordArg;

const main = async () => {
  if (!email || !password) {
    console.error(
      "Usage: npm run create-admin -- \"Admin Name\" admin@example.com strongpassword"
    );
    process.exit(1);
  }

  if (password.length < 6) {
    console.error("Password must be at least 6 characters long.");
    process.exit(1);
  }

  await mongoose.connect(mongoUri);

  const existing = await User.findOne({ email });
  if (existing) {
    existing.name = name;
    existing.role = "admin";
    existing.password = await bcrypt.hash(password, 10);
    await existing.save();
    console.log(`Updated existing user as admin: ${email}`);
    return;
  }

  const hashedPassword = await bcrypt.hash(password, 10);
  await User.create({
    name,
    email,
    password: hashedPassword,
    role: "admin",
  });

  console.log(`Created admin user: ${email}`);
};

main()
  .catch((error) => {
    console.error("Failed to create admin:", error.message);
    process.exitCode = 1;
  })
  .finally(async () => {
    await mongoose.connection.close();
  });
