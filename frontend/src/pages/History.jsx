import { useEffect, useMemo, useState } from "react";
import axios from "axios";
import { auth } from "../firebase";
import toast from "react-hot-toast";

import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  BarChart,
  Bar,
} from "recharts";

const COLORS = ["#22c55e", "#3b82f6", "#ef4444"];

const History = () => {
  const [history, setHistory] = useState([]);
  const [search, setSearch] = useState("");
  const [sortType, setSortType] = useState("high");

  // 🔥 FETCH
  const fetchHistory = async () => {
    try {
      if (!auth.currentUser) return;
      const token = await auth.currentUser.getIdToken();

      const res = await axios.get("/history", {
        headers: { Authorization: `Bearer ${token}` },
      });

      setHistory(res.data || []);
    } catch {
      toast.error("Failed to load history ❌");
    }
  };

  useEffect(() => {
    fetchHistory();
  }, []);

  // 🔍 FILTER + SORT
  const filtered = useMemo(() => {
    let list = history.filter((item) =>
      `${item.score} ${item.grade} ${item.date}`
        .toLowerCase()
        .includes(search.toLowerCase())
    );

    list.sort((a, b) =>
      sortType === "high" ? b.score - a.score : a.score - b.score
    );

    return list;
  }, [history, search, sortType]);

  // 🗑️ DELETE
  const handleDelete = async (id) => {
    try {
      const token = await auth.currentUser.getIdToken();

      await axios.delete(`/prediction/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      setHistory((prev) => prev.filter((item) => item.id !== id));
      toast.success("Deleted 🗑️");
    } catch {
      toast.error("Delete failed ❌");
    }
  };

  // =========================
  // 📊 ANALYTICS LOGIC
  // =========================

  // 📈 Line Chart
  const lineData = filtered.map((item, i) => ({
    name: `#${i + 1}`,
    score: item.score,
  }));

  // 🥧 Pie Chart
  const gradeCount = { A: 0, B: 0, C: 0 };
  filtered.forEach((item) => gradeCount[item.grade]++);
  const pieData = Object.keys(gradeCount).map((k) => ({
    name: k,
    value: gradeCount[k],
  }));

  // 📊 Avg Score (Bar Chart)
  const avgScore =
    filtered.length > 0
      ? Math.round(
          filtered.reduce((sum, item) => sum + item.score, 0) /
            filtered.length
        )
      : 0;

  const barData = [{ name: "Average", score: avgScore }];

  // 🧠 Improvement Insight
  const improvement =
    filtered.length >= 2
      ? (
          ((filtered[0].score - filtered[filtered.length - 1].score) /
            filtered[filtered.length - 1].score) *
          100
        ).toFixed(1)
      : 0;

  // 🏆 Rank System
  const getRank = () => {
    if (avgScore >= 85) return "🏆 Top Performer";
    if (avgScore >= 70) return "🥈 Good Performer";
    return "🥉 Needs Improvement";
  };

  return (
    <div className="min-h-screen bg-slate-100 dark:bg-slate-900 p-6">
      <h1 className="text-3xl font-bold text-center mb-6">
        📜 Prediction History
      </h1>

      {/* 🔍 SEARCH + SORT */}
      <div className="max-w-4xl mx-auto flex gap-4 mb-6 flex-wrap">
        <input
          type="text"
          placeholder="Search..."
          className="flex-1 p-2 rounded border"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

        <select
          value={sortType}
          onChange={(e) => setSortType(e.target.value)}
          className="p-2 rounded border"
        >
          <option value="high">High → Low</option>
          <option value="low">Low → High</option>
        </select>
      </div>

      {/* 🧠 INSIGHTS */}
      {filtered.length > 0 && (
        <div className="max-w-5xl mx-auto mb-6 bg-white p-4 rounded-xl shadow text-center">
          <p className="text-lg">
            📊 Average Score: <b>{avgScore}%</b>
          </p>
          <p>
            🧠 Improvement:{" "}
            <b>
              {improvement > 0
                ? `+${improvement}% 📈`
                : `${improvement}%`}
            </b>
          </p>
          <p>🏆 Rank: <b>{getRank()}</b></p>
        </div>
      )}

      {/* 📊 CHARTS */}
      {filtered.length > 0 && (
        <div className="max-w-5xl mx-auto grid md:grid-cols-3 gap-6 mb-10">

          {/* 📈 Line */}
          <div className="bg-white p-4 rounded-xl shadow">
            <h2 className="text-center font-bold mb-2">Trend</h2>
            <ResponsiveContainer width="100%" height={200}>
              <LineChart data={lineData}>
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Line type="monotone" dataKey="score" />
              </LineChart>
            </ResponsiveContainer>
          </div>

          {/* 🥧 Pie */}
          <div className="bg-white p-4 rounded-xl shadow">
            <h2 className="text-center font-bold mb-2">Grades</h2>
            <ResponsiveContainer width="100%" height={200}>
              <PieChart>
                <Pie data={pieData} dataKey="value" label>
                  {pieData.map((_, i) => (
                    <Cell key={i} fill={COLORS[i % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>

          {/* 📊 Bar */}
          <div className="bg-white p-4 rounded-xl shadow">
            <h2 className="text-center font-bold mb-2">Average</h2>
            <ResponsiveContainer width="100%" height={200}>
              <BarChart data={barData}>
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="score" />
              </BarChart>
            </ResponsiveContainer>
          </div>

        </div>
      )}

      {/* 📋 LIST */}
      <div className="max-w-4xl mx-auto space-y-4">
        {filtered.map((item) => (
          <div
            key={item.id}
            className="bg-white p-4 rounded-xl shadow flex justify-between"
          >
            <div>
              <p className="font-bold">Score: {item.score}%</p>
              <p>Grade: {item.grade}</p>
              <p className="text-sm text-gray-500">
                {new Date(item.date).toLocaleString()}
              </p>
            </div>

            <button
              onClick={() => handleDelete(item.id)}
              className="bg-red-500 text-white px-4 py-2 rounded"
            >
              Delete
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default History;