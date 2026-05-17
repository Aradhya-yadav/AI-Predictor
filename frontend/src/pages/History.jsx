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
const API = "https://ai-predictor-1-syk3.onrender.com";

const History = () => {
  const [history, setHistory] = useState([]);
  const [search, setSearch] = useState("");
  const [sortType, setSortType] = useState("high");
  const [loading, setLoading] = useState(true);

  // 🔥 FETCH DATA
  const fetchHistory = async (user) => {
    try {
      setLoading(true);

      const token = await user.getIdToken();

      const res = await axios.get(`${API}/history`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const formatted = (res.data || []).map((item) => ({
        id: item.id,
        score: Number(item.score),
        grade: item.grade,
        date: item.date,
      }));

      setHistory(formatted);
    } catch (err) {
      console.error("ERROR:", err);
      toast.dismiss();
      toast.error("Failed to load history ❌");
    } finally {
      setLoading(false);
    }
  };

  // 🔥 FIXED AUTH LISTENER
  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        fetchHistory(user);
      } else {
        setHistory([]);
        setLoading(false);
      }
    });

    return () => unsubscribe();
  }, []);

  // 🔍 FILTER + SORT
  const filtered = useMemo(() => {
    let list = history.filter((item) =>
      `${item.score} ${item.grade} ${item.date}`
        .toLowerCase()
        .includes(search.toLowerCase())
    );

    list.sort((a, b) =>
      sortType === "high"
        ? b.score - a.score
        : a.score - b.score
    );

    return list;
  }, [history, search, sortType]);

  // 🗑️ DELETE
  const handleDelete = async (id) => {
    try {
      const token = await auth.currentUser.getIdToken();

      await axios.delete(`${API}/prediction/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setHistory((prev) => prev.filter((item) => item.id !== id));
      toast.success("Deleted 🗑️");
    } catch {
      toast.error("Delete failed ❌");
    }
  };

  // 📈 LINE DATA
  const lineData = filtered.map((item, i) => ({
    name: `#${i + 1}`,
    score: item.score,
  }));

  // 🥧 PIE DATA
  const gradeCount = { A: 0, B: 0, C: 0 };
  filtered.forEach((item) => {
    if (gradeCount[item.grade] !== undefined) {
      gradeCount[item.grade]++;
    }
  });

  const pieData = Object.keys(gradeCount).map((k) => ({
    name: k,
    value: gradeCount[k],
  }));

  // 📊 AVG
  const avgScore =
    filtered.length > 0
      ? Math.round(
          filtered.reduce((sum, item) => sum + item.score, 0) /
            filtered.length
        )
      : 0;

  const barData = [{ name: "Average", score: avgScore }];

  return (
    <div className="min-h-screen bg-slate-100 dark:bg-slate-900 p-6">

      <h1 className="text-3xl font-bold text-center mb-6">
        📜 Prediction History
      </h1>

      {/* 🔍 SEARCH */}
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

      {/* ⏳ LOADING */}
      {loading && (
        <p className="text-center text-gray-500">
          Loading... ⏳
        </p>
      )}

      {/* ❌ EMPTY */}
      {!loading && filtered.length === 0 && (
        <p className="text-center text-gray-500">
          No history found 📭
        </p>
      )}

      {/* 📊 CHARTS */}
      {filtered.length > 0 && (
        <div className="max-w-5xl mx-auto grid md:grid-cols-3 gap-6 mb-10">

          <div className="bg-white p-4 rounded-xl shadow">
            <h2 className="text-center font-bold mb-2">Trend</h2>
            <ResponsiveContainer width="100%" height={200}>
              <LineChart data={lineData}>
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Line type="monotone" dataKey="score" stroke="#3b82f6" />
              </LineChart>
            </ResponsiveContainer>
          </div>

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

          <div className="bg-white p-4 rounded-xl shadow">
            <h2 className="text-center font-bold mb-2">Average</h2>
            <ResponsiveContainer width="100%" height={200}>
              <BarChart data={barData}>
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="score" fill="#22c55e" />
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