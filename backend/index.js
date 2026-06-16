import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import bcrypt from "bcryptjs";

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 5001;
const MONGO_URL = process.env.MONGO_URL;

// Connect to MongoDB
mongoose
  .connect(MONGO_URL)
  .then(() => console.log("Connected to MongoDB successfully"))
  .catch((err) => console.error("MongoDB connection error:", err));

// User Schema & Model
const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  accountNumber: { type: String, required: true, unique: true },
  pin: { type: String, required: true },
  balance: { type: Number, default: 0 },
});

const User = mongoose.model("User", userSchema);

// Routes

// 1. Signup
app.post("/api/atm/signup", async (req, res) => {
  try {
    const { name, accountNumber, pin } = req.body;

    // Validate inputs
    if (!name || !accountNumber || !pin) {
      return res.status(400).json({ message: "All fields are required" });
    }

    // Check if account already exists
    const existingUser = await User.findOne({ accountNumber });
    if (existingUser) {
      return res.status(400).json({ message: "Account number already exists" });
    }

    // Hash the PIN
    const hashedPin = await bcrypt.hash(pin, 10);

    // Create new user with 0 starting balance (or adjust as needed)
    const newUser = new User({
      name,
      accountNumber,
      pin: hashedPin,
      balance: 1000, // Giving 1000 rupees as starting bonus balance for testing!
    });

    await newUser.save();
    res.status(201).json({ message: "Account created successfully" });
  } catch (error) {
    console.error("Signup error:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

// 2. Login
app.post("/api/atm/login", async (req, res) => {
  try {
    const { accountNumber, pin } = req.body;

    if (!accountNumber || !pin) {
      return res.status(400).json({ message: "Account number and PIN are required" });
    }

    const user = await User.findOne({ accountNumber });
    if (!user) {
      return res.status(400).json({ message: "Invalid Account Number or PIN" });
    }

    const isMatch = await bcrypt.compare(pin, user.pin);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid Account Number or PIN" });
    }

    // Return user details expected by frontend
    res.json({
      name: user.name,
      accountNumber: user.accountNumber,
      balance: user.balance,
    });
  } catch (error) {
    console.error("Login error:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

// 3. Get Balance
app.get("/api/atm/balance/:accountNumber", async (req, res) => {
  try {
    const { accountNumber } = req.params;
    const user = await User.findOne({ accountNumber });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    res.json({ balance: user.balance });
  } catch (error) {
    console.error("Get balance error:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

// 4. Deposit
app.put("/api/atm/deposit", async (req, res) => {
  try {
    const { accountNumber, amount } = req.body;
    if (!accountNumber || !amount || amount <= 0) {
      return res.status(400).json({ message: "Invalid input" });
    }

    const user = await User.findOne({ accountNumber });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    user.balance += Number(amount);
    await user.save();

    res.json({ message: "Deposit successful", balance: user.balance });
  } catch (error) {
    console.error("Deposit error:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

// 5. Withdraw
app.put("/api/atm/withdraw", async (req, res) => {
  try {
    const { accountNumber, amount } = req.body;
    if (!accountNumber || !amount || amount <= 0) {
      return res.status(400).json({ message: "Invalid input" });
    }

    const user = await User.findOne({ accountNumber });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    if (user.balance < amount) {
      return res.status(400).json({ message: "Insufficient balance" });
    }

    user.balance -= Number(amount);
    await user.save();

    res.json({ message: "Withdrawal successful", balance: user.balance });
  } catch (error) {
    console.error("Withdrawal error:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

app.listen(PORT, () => {
  console.log(`Backend server is running on http://localhost:${PORT}`);
});
