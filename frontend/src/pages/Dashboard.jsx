import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import toast from "react-hot-toast";
import { auth } from "../firebase";
import axios from "axios";

import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  ResponsiveContainer
} from "recharts";

const Dashboard = () => {
  const [history, setHistory] = useState([]);
  const [user, setUser] = useState(null);

  // 🔥 FETCH FROM BACKEND
  const loadData = async () => {
  try {
    if (!auth.currentUser) return;

    const token = await auth.currentUser.getIdToken();

    const res = await axios.get(
      "https://ai-predictor-1-syk3.onrender.com/history",
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    const formatted = (res.data || []).map((item, index) => ({
      name: `Test ${index + 1}`,
      ...item,
    }));

    setHistory(formatted);
  } catch (err) {
    console.error(err);
    toast.error("Failed to load data ❌");
  }
};

  useEffect(() => {
    loadData();
    setUser(auth.currentUser);
  }, []);

  // 🔢 Average
  const avg =
    history.length > 0
      ? Math.round(
          history.reduce((a, b) => a + b.score, 0) / history.length
        )
      : 0;

  // 🏆 Best Score
  const bestScore =
    history.length > 0
      ? Math.max(...history.map((i) => i.score))
      : 0;

  // 🎓 Best Grade
  const bestGrade =
    history.length > 0
      ? history.reduce((best, item) => {
          const order = { A: 3, B: 2, C: 1 };
          return order[item.grade] > order[best] ? item.grade : best;
        }, "C")
      : "-";

  // 🧠 Improvement
  const improvement =
    history.length >= 2
      ? (
          ((history[0].score - history[history.length - 1].score) /
            history[history.length - 1].score) *
          100
        ).toFixed(1)
      : 0;

  // 🏆 Rank
  const getRank = () => {
    if (avg >= 85) return "🏆 Top Performer";
    if (avg >= 70) return "🥈 Good Performer";
    return "🥉 Needs Improvement";
  };

  return (
    <div className="min-h-screen bg-slate-100 dark:bg-slate-900 p-6">

      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <motion.h1
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-2xl font-bold text-slate-800 dark:text-white"
        >
          Dashboard
        </motion.h1>
      </div>

      {/* 👤 USER */}
      <div className="bg-white dark:bg-slate-800 p-5 rounded-xl shadow mb-6">
        <h2 className="text-lg font-semibold mb-2">
          User Information
        </h2>

        <p><b>Name:</b> {user?.displayName || "Not set"}</p>
        <p><b>Email:</b> {user?.email}</p>
        <p><b>Role:</b> Student</p>
      </div>

      {/* Empty */}
      {history.length === 0 && (
        <p className="text-center text-gray-500 mb-6">
          No predictions yet 📭
        </p>
      )}

      {/* 📊 STATS */}
      <div className="grid md:grid-cols-4 gap-6 mb-8">

        <motion.div whileHover={{ scale: 1.05 }}
          className="bg-white p-5 rounded-xl shadow text-center">
          <p>Total</p>
          <h2 className="text-2xl font-bold">{history.length}</h2>
        </motion.div>

        <motion.div whileHover={{ scale: 1.05 }}
          className="bg-white p-5 rounded-xl shadow text-center">
          <p>Average</p>
          <h2 className="text-2xl font-bold">{avg}%</h2>
        </motion.div>

        <motion.div whileHover={{ scale: 1.05 }}
          className="bg-white p-5 rounded-xl shadow text-center">
          <p>Best Score</p>
          <h2 className="text-2xl font-bold">{bestScore}%</h2>
        </motion.div>

        <motion.div whileHover={{ scale: 1.05 }}
          className="bg-white p-5 rounded-xl shadow text-center">
          <p>Rank</p>
          <h2 className="text-lg font-bold">{getRank()}</h2>
        </motion.div>

      </div>

      {/* 🧠 INSIGHT */}
      {history.length > 1 && (
        <div className="bg-white p-4 rounded-xl shadow text-center mb-6">
          <p>
            🧠 Improvement:{" "}
            <b>
              {improvement > 0
                ? `+${improvement}% 📈`
                : `${improvement}%`}
            </b>
          </p>
        </div>
      )}

      {/* 📈 CHART */}
      {history.length > 0 && (
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white p-6 rounded-xl shadow"
        >
          <h2 className="text-lg font-semibold mb-4">
            Performance Trend
          </h2>

          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={history}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />

              <Line
                type="monotone"
                dataKey="score"
                stroke="#3b82f6"
                strokeWidth={3}
              />
            </LineChart>
          </ResponsiveContainer>
        </motion.div>
      )}

    </div>
  );
};

export default Dashboard;