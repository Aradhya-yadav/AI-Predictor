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

const API = "https://ai-predictor-1-syk3.onrender.com";

const Dashboard = () => {
  const [history, setHistory] = useState([]);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // 🔥 FETCH DATA
  const loadData = async (user) => {
    try {
      setLoading(true);

      const token = await user.getIdToken();

      const res = await axios.get(`${API}/history`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const formatted = (res.data || []).map((item, index) => ({
        name: `Test ${index + 1}`,
        score: Number(item.score),
        grade: item.grade,
        date: item.date,
      }));

      setHistory(formatted);

    } catch (err) {
      console.error("ERROR:", err);
      toast.error("Failed to load data ❌");
    } finally {
      setLoading(false);
    }
  };

  // 🔥 AUTH LISTENER FIX
  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((currentUser) => {
      setUser(currentUser);

      if (currentUser) {
        loadData(currentUser);
      } else {
        setHistory([]);
        setLoading(false);
      }
    });

    return () => unsubscribe();
  }, []);

  // 📊 CALCULATIONS
  const avg =
    history.length > 0
      ? Math.round(
          history.reduce((a, b) => a + b.score, 0) / history.length
        )
      : 0;

  const bestScore =
    history.length > 0
      ? Math.max(...history.map((i) => i.score))
      : 0;

  const getRank = () => {
    if (avg >= 85) return "🏆 Top Performer";
    if (avg >= 70) return "🥈 Good Performer";
    return "🥉 Needs Improvement";
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-100 to-blue-100 dark:from-slate-900 dark:to-slate-800 p-6">

      {/* TITLE */}
      <h1 className="text-3xl font-bold mb-8 text-center text-slate-800 dark:text-white">
        🚀 Dashboard Overview
      </h1>

      {/* USER CARD */}
      <div className="max-w-4xl mx-auto mb-8">
        <div className="bg-white/70 backdrop-blur-lg dark:bg-slate-800/60 p-6 rounded-2xl shadow-xl border border-white/30">
          <h2 className="text-xl font-semibold mb-2">👤 User Info</h2>
          <p><b>Name:</b> {user?.displayName || "Not set"}</p>
          <p><b>Email:</b> {user?.email}</p>
        </div>
      </div>

      {/* LOADING */}
      {loading && (
        <p className="text-center text-gray-500">Loading... ⏳</p>
      )}

      {/* EMPTY */}
      {!loading && history.length === 0 && (
        <p className="text-center text-gray-500">
          No predictions yet 📭
        </p>
      )}

      {/* STATS */}
      {history.length > 0 && (
        <div className="grid md:grid-cols-3 gap-6 mb-10">

          {[
            { title: "Total", value: history.length },
            { title: "Average", value: `${avg}%` },
            { title: "Best Score", value: `${bestScore}%` },
          ].map((card, i) => (
            <motion.div
              key={i}
              whileHover={{ scale: 1.08 }}
              className="bg-white/70 backdrop-blur-md dark:bg-slate-800/60 p-6 rounded-2xl shadow-xl text-center border border-white/30"
            >
              <p className="text-gray-500">{card.title}</p>
              <h2 className="text-3xl font-bold text-blue-500">
                {card.value}
              </h2>
            </motion.div>
          ))}

        </div>
      )}

      {/* RANK */}
      {history.length > 0 && (
        <div className="text-center mb-8">
          <span className="bg-blue-500 text-white px-6 py-2 rounded-full shadow">
            {getRank()}
          </span>
        </div>
      )}

      {/* CHART */}
      {history.length > 0 && (
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white/80 backdrop-blur-lg p-6 rounded-2xl shadow-xl border border-white/30"
        >
          <h2 className="text-lg font-semibold mb-4 text-center">
            📈 Performance Trend
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
                strokeWidth={4}
                dot={{ r: 5 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </motion.div>
      )}

    </div>
  );
};

export default Dashboard;