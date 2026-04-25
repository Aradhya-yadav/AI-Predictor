const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

// 🔥 TEMP: no auth
const verifyToken = (req, res, next) => {
  req.user = { uid: "demo-user" }; // dummy user
  next();
};

// 🧠 PREDICT (NO DB)
app.post("/predict", verifyToken, async (req, res) => {
  const { hours, attendance, marks } = req.body;

  const score = Math.min(
    100,
    Math.round(hours * 5 + attendance * 0.3 + marks * 0.2)
  );

  const result = {
    score,
    grade: score > 80 ? "A" : score > 60 ? "B" : "C",
    date: new Date().toISOString(),
  };

  res.json(result);
});

// 📜 HISTORY (dummy)
app.get("/history", verifyToken, async (req, res) => {
  res.json([]);
});

// 🗑️ DELETE (dummy)
app.delete("/prediction/:id", verifyToken, async (req, res) => {
  res.json({ success: true });
});

// 🧪 TEST
app.get("/", (req, res) => {
  res.send("Backend running 🚀");
});

app.get("/api", (req, res) => {
  res.json({ message: "Backend connected successfully 🚀" });
});

// 🔥 PORT FIX
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});