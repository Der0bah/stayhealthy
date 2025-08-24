// Minimal Express server compatible with your frontend calls
const express = require("express");
const cors = require("cors");

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// Very simple in‑memory “user profile” so you can test without a DB
let user = {
  name: "Peter",
  phone: "1234567890",
  email: "peter@gmail.com",
};

// GET /api/auth/user  (reads Email header like your frontend)
app.get("/api/auth/user", (req, res) => {
  const email = req.header("Email");
  if (!email || email !== user.email) {
    return res.status(404).json({ error: "User not found" });
  }
  res.json(user);
});

// PUT /api/auth/user  (updates name/phone)
app.put("/api/auth/user", (req, res) => {
  const email = req.header("Email");
  if (!email || email !== user.email) {
    return res.status(404).json({ error: "User not found" });
  }
  user = { ...user, ...req.body, email: user.email }; // keep email fixed
  res.json(user);
});

app.get("/", (_req, res) => res.send("StayHealthy server is running"));

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
