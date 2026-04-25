import { Link } from "react-router-dom";
import { motion } from "framer-motion";

const Home = () => {
  return (
    <div className="min-h-screen bg-slate-100 dark:bg-slate-900">

      {/* 🔥 Hero Section */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex flex-col items-center justify-center text-center py-24 px-6"
      >

        {/* Badge */}
        <span className="bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-300 px-4 py-1 rounded-full text-sm mb-4">
          AI Powered System 🤖
        </span>

        <h1 className="text-4xl md:text-5xl font-bold text-slate-800 dark:text-white mb-4">
          Student Performance Predictor
        </h1>

        <p className="text-gray-600 dark:text-gray-300 max-w-xl mb-6">
          Analyze your study data like hours, attendance, and marks to
          predict your academic performance and improve results with
          smart insights.
        </p>

        {/* CTA */}
        <motion.div whileTap={{ scale: 0.95 }}>
          <Link
            to="/predict"
            className="bg-blue-500 hover:bg-blue-600 active:scale-95 transition text-white px-8 py-3 rounded-lg font-semibold shadow-md"
          >
            Start Prediction 🚀
          </Link>
        </motion.div>

      </motion.div>

      {/* 🔥 Features */}
      <div className="max-w-6xl mx-auto px-6 py-12 grid md:grid-cols-3 gap-6">

        <motion.div
          whileHover={{ scale: 1.05 }}
          className="bg-white dark:bg-slate-800 p-6 rounded-xl shadow hover:shadow-xl transition text-center"
        >
          <h3 className="text-lg font-semibold mb-2 text-slate-800 dark:text-white">
            📊 Smart Prediction
          </h3>
          <p className="text-gray-600 dark:text-gray-300 text-sm">
            Uses data-driven logic to estimate your academic performance.
          </p>
        </motion.div>

        <motion.div
          whileHover={{ scale: 1.05 }}
          className="bg-white dark:bg-slate-800 p-6 rounded-xl shadow hover:shadow-xl transition text-center"
        >
          <h3 className="text-lg font-semibold mb-2 text-slate-800 dark:text-white">
            ⚡ Instant Results
          </h3>
          <p className="text-gray-600 dark:text-gray-300 text-sm">
            Get quick performance insights in real-time.
          </p>
        </motion.div>

        <motion.div
          whileHover={{ scale: 1.05 }}
          className="bg-white dark:bg-slate-800 p-6 rounded-xl shadow hover:shadow-xl transition text-center"
        >
          <h3 className="text-lg font-semibold mb-2 text-slate-800 dark:text-white">
            💡 Improvement Tips
          </h3>
          <p className="text-gray-600 dark:text-gray-300 text-sm">
            Receive personalized suggestions to improve your scores.
          </p>
        </motion.div>

      </div>

      {/* 🔥 Extra Section (Pro Touch) */}
      <div className="text-center pb-12">
        <p className="text-sm text-gray-500 dark:text-gray-400">
          Built using React, Node.js, Firebase & Data Visualization 📊
        </p>
      </div>

    </div>
  );
};

export default Home;