const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");

require("dotenv").config();

const app = express();
const PORT = process.env.PORT;

const mongoURI = process.env.MONGO_URI;
mongoose.connect(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true });

const transactionSchema = new mongoose.Schema({
  sender: String,
  receiver: String,
  amount: Number,
  signature: String,
  timestamp: { type: Date, default: Date.now },
});

const userSchema = new mongoose.Schema({
  address: String,
});

const Transaction = mongoose.model("Transaction", transactionSchema);
const User = mongoose.model("User", userSchema);

app.use(bodyParser.json());

var corsOptions = {
  origin: "*",
  optionsSuccessStatus: 200,
};

app.use(cors(corsOptions));

app.post("/api/transactions", async (req, res) => {
  try {
    const { sender, receiver, amount, signature } = req.body;

    const newTransaction = new Transaction({
      sender,
      receiver,
      amount,
      signature,
    });
    await newTransaction.save();

    res.status(201).json({ message: "Transaction saved successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
});

app.get("/api/transactions", async (req, res) => {
  try {
    const transactions = await Transaction.find();
    res.status(200).json(transactions);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
});

app.post("/api/users", async (req, res) => {
  try {
    const { address } = req.body; // Corrected this line
    const userAddress = new User({
      address,
    });
    await userAddress.save();

    res.status(201).json({ message: "user saved successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
});

app.get("/api/users", async (req, res) => {
  try {
    const transactions = await Transaction.find();
    res.status(200).json(transactions);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
});

app.get("/api/existUser/:address", async (req, res) => {
  try {
    const user = await User.findOne(
      { address: req.params.address },
      { _id: 0 }
    );
    if (user == null) {
      res.status(200).json(false);
    } else {
      res.status(200).json(true);
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
