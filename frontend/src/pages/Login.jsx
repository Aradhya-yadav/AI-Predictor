import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import toast from "react-hot-toast";
import { motion } from "framer-motion";
import { auth } from "../firebase";
import {
  signInWithEmailAndPassword,
  sendPasswordResetEmail
} from "firebase/auth";

const Login = () => {
  const [data, setData] = useState({ email: "", password: "" });
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const navigate = useNavigate();
  const location = useLocation();

  const from = location.state?.from?.pathname || "/dashboard";

  const handleChange = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

  // 🔥 EMAIL RESET FUNCTION
  const handleForgotPassword = async () => {
    if (!data.email) {
      toast.error("Please enter your email ❗");
      return;
    }

    try {
     await sendPasswordResetEmail(auth, data.email.trim(), {
      url: "https://ai-predictor-l5ui.vercel.app/reset-password"
        });
      console.log("EMAIL SENT ✅");
      toast.success("Reset link sent to your email 📩");
    } catch (err) {
      console.log(err.code);

      if (err.code === "auth/user-not-found") {
        toast.error("User not found ❌");
      } else if (err.code === "auth/invalid-email") {
        toast.error("Invalid email ❌");
      } else {
        toast.error("Failed to send email ❌");
      }
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!data.email || !data.password) {
      toast.error("All fields are required ❗");
      return;
    }

    setLoading(true);

    try {
      await signInWithEmailAndPassword(
        auth,
        data.email.trim(),
        data.password.trim()
      );

      toast.success("Login successful 🎉");
      navigate(from);

    } catch (err) {
      console.log("Login error:", err.code);

      if (err.code === "auth/invalid-credential") {
        toast.error("Invalid email or password ❌");
      } else if (err.code === "auth/user-not-found") {
        toast.error("User not found ❌");
      } else if (err.code === "auth/wrong-password") {
        toast.error("Wrong password ❌");
      } else {
        toast.error("Login failed ❌");
      }
    }

    setLoading(false);
  };

  return (
    <div className="min-h-screen flex justify-center items-center bg-gradient-to-br from-blue-100 to-purple-100 dark:from-slate-900 dark:to-slate-800 px-4">

      <motion.form
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        onSubmit={handleSubmit}
        className="w-full max-w-md bg-white dark:bg-slate-800 rounded-2xl shadow-2xl p-6 sm:p-8"
      >

        <h2 className="text-3xl font-bold text-center mb-2 text-slate-800 dark:text-white">
          Welcome Back 👋
        </h2>

        <p className="text-center text-gray-500 mb-6 text-sm">
          Login to continue your journey 🚀
        </p>

        {/* Email */}
        <input
          name="email"
          type="email"
          placeholder="Enter your email"
          value={data.email}
          onChange={handleChange}
          className="w-full mb-4 p-3 rounded-lg border focus:ring-2 focus:ring-blue-400 outline-none"
        />

        {/* Password */}
        <div className="relative mb-4">
          <input
            name="password"
            type={showPassword ? "text" : "password"}
            placeholder="Enter your password"
            value={data.password}
            onChange={handleChange}
            className="w-full p-3 rounded-lg border focus:ring-2 focus:ring-blue-400 outline-none"
          />

          <span
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-3 top-3 cursor-pointer text-sm text-gray-500"
          >
            {showPassword ? "Hide" : "Show"}
          </span>
        </div>

        {/* 🔥 EMAIL RESET BUTTON */}
        <p
          onClick={handleForgotPassword}
          className="text-right text-sm text-blue-500 cursor-pointer mb-4 hover:underline"
        >
          Forgot Password?
        </p>

        {/* Button */}
        <motion.button
          whileTap={{ scale: 0.95 }}
          disabled={loading}
          type="submit"
          className="w-full bg-blue-500 hover:bg-blue-600 text-white py-3 rounded-lg font-semibold transition disabled:opacity-50"
        >
          {loading ? "Logging in..." : "Login"}
        </motion.button>

        {/* Signup */}
        <p className="text-center mt-4 text-sm text-gray-500">
          Don't have an account?{" "}
          <span
            className="text-blue-500 cursor-pointer font-semibold"
            onClick={() => navigate("/signup")}
          >
            Signup
          </span>
        </p>

      </motion.form>
    </div>
  );
};

export default Login;