import { Link } from "react-router-dom";
import { motion } from "framer-motion";

const Footer = () => {
  return (
    <footer className="bg-slate-200 dark:bg-slate-900 text-gray-700 dark:text-gray-300 mt-16">
      
      <div className="max-w-6xl mx-auto px-6 py-10 grid md:grid-cols-3 gap-8">
        
        {/* Brand */}
        <div>
          <h2 className="text-xl font-bold text-slate-800 dark:text-white mb-2">
            AI Predictor
          </h2>
          <p className="text-sm">
            Analyze student performance using data-driven insights and improve
            learning outcomes with smart predictions.
          </p>
        </div>

        {/* Links */}
        <div>
          <h3 className="text-slate-800 dark:text-white font-semibold mb-3">
            Quick Links
          </h3>

          <ul className="space-y-2 text-sm">
            <li>
              <Link className="hover:text-blue-500 transition" to="/">Home</Link>
            </li>
            <li>
              <Link className="hover:text-blue-500 transition" to="/predict">Predict</Link>
            </li>
            <li>
              <Link className="hover:text-blue-500 transition" to="/dashboard">Dashboard</Link>
            </li>
            <li>
              <Link className="hover:text-blue-500 transition" to="/about">About</Link>
            </li>
          </ul>
        </div>

        {/* Contact */}
        <div>
          <h3 className="text-slate-800 dark:text-white font-semibold mb-3">
            Contact
          </h3>

          <p className="text-sm">Email: 2308390100015@reck.ac.in</p>
          <p className="text-sm">Location: India</p>

          {/* 🔥 Social Links */}
          <div className="flex gap-4 mt-4 text-lg">

            <motion.a
              whileHover={{ scale: 1.2 }}
              href="https://github.com/Aradhya-yadav"
              target="_blank"
              className="hover:text-black dark:hover:text-white"
            >
              🐙
            </motion.a>

            <motion.a
              whileHover={{ scale: 1.2 }}
              href="https://www.linkedin.com/in/aradhya-yadav-645910373/"
              target="_blank"
              className="hover:text-blue-600"
            >
              💼
            </motion.a>

            <motion.a
              whileHover={{ scale: 1.2 }}
              href="mailto:2308390100015@reck.ac.in"
              className="hover:text-red-500"
            >
              📧
            </motion.a>

          </div>
        </div>

      </div>

      {/* Bottom */}
      <div className="border-t border-gray-300 dark:border-gray-700 text-center py-4 text-sm">
        © 2026 AI Student Performance Predictor | Built with React, Node.js & Firebase 🚀
      </div>

    </footer>
  );
};

export default Footer;