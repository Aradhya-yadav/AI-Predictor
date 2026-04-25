import { useState } from "react";
import { motion } from "framer-motion";
import InputForm from "../components/InputForm";
import Loader from "../components/Loader";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { auth } from "../firebase";

const Predict = () => {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handlePrediction = async (data) => {
    setLoading(true);

    try {
      // 🔐 Check login
      if (!auth.currentUser) {
        toast.error("Please login first ❌");
        setLoading(false);
        return;
      }

      // 🔥 Token
      const token = await auth.currentUser.getIdToken();

      // 🔥 API CALL (proxy use karo)
      const res = await axios.post(
        "/predict",
        {
          hours: Number(data.hours),
          attendance: Number(data.attendance),
          marks: Number(data.marks),
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const newResult = {
        ...res.data,
        date: new Date().toLocaleString(),
      };

      // 🔥 Local history (optional)
      const old = JSON.parse(localStorage.getItem("history")) || [];
      localStorage.setItem("history", JSON.stringify([...old, newResult]));

      toast.success("Prediction completed 🎉");

      // 🔥 Navigate
      navigate("/result", { state: newResult });

    } catch (err) {
      console.error("ERROR:", err);
      toast.error(err.response?.data?.error || "Something went wrong ❌");
    }

    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-slate-100 dark:bg-slate-900 py-10 px-4">
      
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="text-center mb-8"
      >
        <h1 className="text-3xl font-bold text-slate-800 dark:text-white">
          Student Performance Predictor
        </h1>
      </motion.div>

      <div className="max-w-xl mx-auto bg-white dark:bg-slate-800 p-6 rounded-xl shadow">
        <InputForm onSubmit={handlePrediction} />
        {loading && <Loader />}
      </div>

    </div>
  );
};

export default Predict;