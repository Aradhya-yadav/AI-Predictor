import { useState } from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { motion } from "framer-motion";
import { auth } from "../firebase";
import {
  createUserWithEmailAndPassword,
  updateProfile
} from "firebase/auth";

const Signup = () => {
  const [data, setData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: ""
  });

  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const navigate = useNavigate();

  const handleChange = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

  const handleSignup = async (e) => {
    e.preventDefault();

    if (!data.name || !data.email || !data.password || !data.confirmPassword) {
      toast.dismiss();
      toast.error("All fields required ❗");
      return;
    }

    if (data.password.length < 6) {
      toast.dismiss();
      toast.error("Password must be at least 6 characters ❗");
      return;
    }

    if (data.password !== data.confirmPassword) {
      toast.dismiss();
      toast.error("Passwords do not match ❌");
      return;
    }

    setLoading(true);

    try {
      console.log("Signup start");

      // 🔥 CREATE USER
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        data.email.trim(),
        data.password.trim()
      );

      console.log("User created:", userCredential.user);

      // 🔥 UPDATE PROFILE (NAME + PHOTO)
      await updateProfile(userCredential.user, {
        displayName: data.name,
        photoURL: `https://ui-avatars.com/api/?name=${data.name}`
      });

      toast.success("Account created 🎉");

      navigate("/login");

    } catch (err) {
      console.log("Signup error:", err.code);

      if (err.code === "auth/email-already-in-use") {
        toast.dismiss();
        toast.error("Email already exists ❌");
      } else if (err.code === "auth/invalid-email") {
        toast.dismiss();
        toast.error("Invalid email ❌");
      } else if (err.code === "auth/weak-password") {
        toast.dismiss();
        toast.error("Weak password ❌");
      } else {
        toast.dismiss();
        toast.error("Signup failed ❌");
      }
    }

    setLoading(false);
  };

  return (
    <div className="min-h-screen flex justify-center bg-gradient-to-br from-purple-100 to-blue-100 dark:from-slate-900 dark:to-slate-800 px-4 pt-24 pb-10">

      <motion.form
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        onSubmit={handleSignup}
        className="w-full max-w-md bg-white dark:bg-slate-800 rounded-2xl shadow-2xl p-6 sm:p-8"
      >

        <h2 className="text-3xl font-bold text-center mb-2 text-slate-800 dark:text-white">
          Create Account 🚀
        </h2>

        <p className="text-center text-gray-500 mb-6 text-sm">
          Join and start predicting smarter 📊
        </p>

        {/* Name */}
        <input
          name="name"
          type="text"
          placeholder="Enter your name"
          onChange={handleChange}
          className="w-full mb-4 p-3 rounded-lg border focus:ring-2 focus:ring-purple-400 outline-none"
        />

        {/* Email */}
        <input
          name="email"
          type="email"
          placeholder="Enter your email"
          onChange={handleChange}
          className="w-full mb-4 p-3 rounded-lg border focus:ring-2 focus:ring-purple-400 outline-none"
        />

        {/* Password */}
        <div className="relative mb-4">
          <input
            name="password"
            type={showPassword ? "text" : "password"}
            placeholder="Create password"
            onChange={handleChange}
            className="w-full p-3 rounded-lg border focus:ring-2 focus:ring-purple-400 outline-none"
          />

          <span
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-3 top-3 cursor-pointer text-sm text-gray-500"
          >
            {showPassword ? "Hide" : "Show"}
          </span>
        </div>

        {/* Confirm Password */}
        <input
          name="confirmPassword"
          type="password"
          placeholder="Confirm password"
          onChange={handleChange}
          className="w-full mb-4 p-3 rounded-lg border focus:ring-2 focus:ring-purple-400 outline-none"
        />

        {/* Button */}
        <motion.button
          whileTap={{ scale: 0.95 }}
          disabled={loading}
          type="submit"
          className="w-full bg-purple-500 hover:bg-purple-600 text-white py-3 rounded-lg font-semibold transition disabled:opacity-50"
        >
          {loading ? "Creating..." : "Signup"}
        </motion.button>

        {/* Login */}
        <p className="text-center mt-4 text-sm text-gray-500">
          Already have an account?{" "}
          <span
            className="text-purple-500 cursor-pointer font-semibold"
            onClick={() => navigate("/login")}
          >
            Login
          </span>
        </p>

      </motion.form>
    </div>
  );
};

export default Signup;