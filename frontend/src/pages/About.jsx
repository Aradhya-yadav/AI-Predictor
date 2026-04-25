import { motion } from "framer-motion";

const About = () => {
  return (
    <div className="min-h-screen bg-slate-100 dark:bg-slate-900 py-12 px-6">
      
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-4xl mx-auto bg-white dark:bg-slate-800 shadow-xl rounded-2xl p-8"
      >
        
        {/* Title */}
        <h1 className="text-3xl font-bold text-slate-800 dark:text-white mb-4 text-center">
          About This Project
        </h1>

        {/* Description */}
        <p className="text-gray-600 dark:text-gray-300 text-center mb-8">
          This AI-powered system analyzes student data such as study hours,
          attendance, and previous marks to predict academic performance.
          It provides smart insights and suggestions to help students improve
          their results and make better learning decisions.
        </p>

        {/* Sections */}
        <div className="grid md:grid-cols-2 gap-6">
          
          {/* Objective */}
          <motion.div
            whileHover={{ scale: 1.03 }}
            className="bg-blue-50 dark:bg-blue-900/30 p-5 rounded-xl"
          >
            <h2 className="text-lg font-semibold text-blue-600 dark:text-blue-300 mb-2">
              🎯 Objective
            </h2>
            <p className="text-gray-600 dark:text-gray-300 text-sm">
              To help students understand their academic performance early and
              improve their results using intelligent data-driven predictions.
            </p>
          </motion.div>

          {/* Features */}
          <motion.div
            whileHover={{ scale: 1.03 }}
            className="bg-green-50 dark:bg-green-900/30 p-5 rounded-xl"
          >
            <h2 className="text-lg font-semibold text-green-600 dark:text-green-300 mb-2">
              ⚡ Features
            </h2>
            <ul className="text-sm text-gray-600 dark:text-gray-300 list-disc ml-4 space-y-1">
              <li>AI-inspired performance prediction</li>
              <li>Real-time result generation</li>
              <li>Smart improvement suggestions</li>
              <li>Interactive dashboard with analytics</li>
            </ul>
          </motion.div>

          {/* Tech Stack */}
          <motion.div
            whileHover={{ scale: 1.03 }}
            className="bg-purple-50 dark:bg-purple-900/30 p-5 rounded-xl"
          >
            <h2 className="text-lg font-semibold text-purple-600 dark:text-purple-300 mb-2">
              🛠 Tech Stack
            </h2>
            <ul className="text-sm text-gray-600 dark:text-gray-300 list-disc ml-4 space-y-1">
              <li>Frontend: React.js + Tailwind CSS</li>
              <li>Backend: Node.js (Express.js REST API)</li>
              <li>Authentication: Firebase Auth</li>
              <li>Database: Firebase Realtime Database</li>
            </ul>
          </motion.div>

          {/* Future Scope */}
          <motion.div
            whileHover={{ scale: 1.03 }}
            className="bg-yellow-50 dark:bg-yellow-900/30 p-5 rounded-xl"
          >
            <h2 className="text-lg font-semibold text-yellow-600 dark:text-yellow-300 mb-2">
              🚀 Future Scope
            </h2>
            <p className="text-sm text-gray-600 dark:text-gray-300">
              Adding advanced analytics, personalized dashboards, and integrating
              real machine learning models for more accurate predictions.
            </p>
          </motion.div>

          {/* Why This Project */}
          <motion.div
            whileHover={{ scale: 1.03 }}
            className="bg-pink-50 dark:bg-pink-900/30 p-5 rounded-xl md:col-span-2"
          >
            <h2 className="text-lg font-semibold text-pink-600 dark:text-pink-300 mb-2">
              💡 Why This Project?
            </h2>
            <p className="text-sm text-gray-600 dark:text-gray-300">
              This project helps students identify their strengths and weaknesses
              early, enabling data-driven decision making and improving academic
              outcomes through smart insights.
            </p>
          </motion.div>

        </div>

      </motion.div>
    </div>
  );
};

export default About;