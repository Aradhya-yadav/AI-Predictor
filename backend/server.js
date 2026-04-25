const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const admin = require("firebase-admin");
const serviceAccount = require("./serviceAccountKey.json");

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

// 🔥 Firebase Admin
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL:
    "https://ai-predictor-53f41-default-rtdb.asia-southeast1.firebasedatabase.app",
});

const db = admin.database();
const authAdmin = admin.auth();

// 🔐 TOKEN VERIFY
const verifyToken = async (req, res, next) => {
  try {
    const header = req.headers.authorization || "";
    const token = header.split("Bearer ")[1];

    const decoded = await authAdmin.verifyIdToken(token);
    req.user = decoded;
    next();
  } catch {
    res.status(401).json({ error: "Unauthorized" });
  }
};

// 🧠 PREDICT
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

  const ref = db.ref(`users/${req.user.uid}/predictions`).push();
  await ref.set(result);

  res.json(result);
});

// 📜 HISTORY
app.get("/history", verifyToken, async (req, res) => {
  const snapshot = await db
    .ref(`users/${req.user.uid}/predictions`)
    .once("value");

  const data = snapshot.val() || {};
  const list = Object.entries(data).map(([id, val]) => ({
    id,
    ...val,
  }));

  res.json(list);
});

// 🗑️ DELETE
app.delete("/prediction/:id", verifyToken, async (req, res) => {
  const { id } = req.params;

  await db
    .ref(`users/${req.user.uid}/predictions/${id}`)
    .remove();

  res.json({ success: true });
});

app.get("/", (req, res) => {
  res.send("API running 🚀");
});

app.listen(5000, () => {
  console.log("Server running on port 5000");
});
app.get('/api', (req, res) => {
  res.json({ message: "Backend connected successfully 🚀" });
});