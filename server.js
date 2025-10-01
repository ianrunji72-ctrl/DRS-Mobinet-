// server.js
import express from "express";
import bodyParser from "body-parser";
import cors from "cors";

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Example in-memory database (replace with Firebase or MongoDB later)
let users = [];
let vouchers = [{ code: "ABC123", active: true }];

// Routes
app.get("/", (req, res) => {
  res.send("IANO.DRS Backend is running ✅");
});

app.post("/register", (req, res) => {
  const { username, password } = req.body;
  if (users.find((u) => u.username === username)) {
    return res.status(400).json({ error: "User already exists" });
  }
  users.push({ username, password });
  res.json({ message: "User registered successfully" });
});

app.post("/login", (req, res) => {
  const { username, password } = req.body;
  const user = users.find(
    (u) => u.username === username && u.password === password
  );
  if (!user) {
    return res.status(400).json({ error: "Invalid credentials" });
  }
  res.json({ message: "Login successful" });
});

app.get("/voucher/:code", (req, res) => {
  const code = req.params.code;
  const voucher = vouchers.find((v) => v.code === code);
  if (!voucher) {
    return res.status(404).json({ error: "Voucher not found" });
  }
  if (!voucher.active) {
    return res.status(400).json({ error: "Voucher already used" });
  }
  voucher.active = false;
  res.json({ message: "Voucher redeemed successfully" });
});

// Start server
app.listen(PORT, () => {
  console.log(`IANO.DRS Backend running on port ${PORT}`);
});