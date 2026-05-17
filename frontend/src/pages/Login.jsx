import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import toast from "react-hot-toast";
import { motion } from "framer-motion";

import { auth, googleProvider } from "../firebase";

import {
  signInWithEmailAndPassword,
  sendPasswordResetEmail,
  signInWithPopup
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

  // 🔥 FORGOT PASSWORD
  const handleForgotPassword = async () => {
    if (!data.email) {
      toast.dismiss();
      toast.error("Please enter your email ❗");
      return;
    }

    try {
      await sendPasswordResetEmail(auth, data.email.trim(), {
        url: "https://ai-predictor-l5ui.vercel.app/reset-password"
      });

      toast.success("Reset link sent to your email 📩");

    } catch (err) {
      console.log(err.code);

      if (err.code === "auth/user-not-found") {
        toast.dismiss();
        toast.error("User not found ❌");
      } else if (err.code === "auth/invalid-email") {
        toast.dismiss();
        toast.error("Invalid email ❌");
      } else {
        toast.dismiss();
        toast.error("Failed to send email ❌");
      }
    }
  };

  // 🔥 EMAIL LOGIN
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!data.email || !data.password) {
      toast.dismiss();
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
        toast.dismiss();
        toast.error("Invalid email or password ❌");
      } else if (err.code === "auth/user-not-found") {
        toast.dismiss();
        toast.error("User not found ❌");
      } else if (err.code === "auth/wrong-password") {
        toast.dismiss();
        toast.error("Wrong password ❌");
      } else {
        toast.dismiss();
        toast.error("Login failed ❌");
      }
    }

    setLoading(false);
  };

  // 🔥 GOOGLE LOGIN
  const handleGoogleLogin = async () => {
    try {
      await signInWithPopup(auth, googleProvider);

      toast.success("Google login successful 🎉");

      navigate(from);

    } catch (err) {
      console.log(err);
       toast.dismiss();
      toast.error("Google login failed ❌");
    }
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

        {/* Forgot Password */}
        <p
          onClick={handleForgotPassword}
          className="text-right text-sm text-blue-500 cursor-pointer mb-4 hover:underline"
        >
          Forgot Password?
        </p>

        {/* Login Button */}
        <motion.button
          whileTap={{ scale: 0.95 }}
          disabled={loading}
          type="submit"
          className="w-full bg-blue-500 hover:bg-blue-600 text-white py-3 rounded-lg font-semibold transition disabled:opacity-50"
        >
          {loading ? "Logging in..." : "Login"}
        </motion.button>

        {/* Divider */}
        <div className="flex items-center gap-3 my-5">
          <div className="flex-1 h-[1px] bg-gray-300"></div>

          <span className="text-sm text-gray-500">
            OR
          </span>

          <div className="flex-1 h-[1px] bg-gray-300"></div>
        </div>

            {/* Google Login */}
        <button
          type="button"
          onClick={handleGoogleLogin}
             className="w-full flex items-center justify-center gap-3 border border-gray-300 dark:border-slate-600 py-3 rounded-lg font-semibold hover:bg-gray-100 dark:hover:bg-slate-700 transition">

                <img
                 src="https://www.gstatic.com/firebasejs/ui/2.0.0/images/auth/google.svg"
                 alt="google"
                 className="w-5 h-5"
                 />

              Continue with Google
             </button>

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