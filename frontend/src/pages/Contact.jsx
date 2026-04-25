import { useState } from "react";
import toast from "react-hot-toast";
import { motion } from "framer-motion";

const Contact = () => {
  const [form, setForm] = useState({
    name: "",
    email: "",
    message: ""
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // 🔥 Better email validation
  const isValidEmail = (email) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!form.name || !form.email || !form.message) {
      toast.error("Please fill all fields ❗");
      return;
    }

    if (!isValidEmail(form.email)) {
      toast.error("Enter a valid email ❌");
      return;
    }

    try {
      setLoading(true);

      // 👉 FUTURE: backend API call yaha add kar sakte ho
      // await axios.post("/contact", form);

      await new Promise((res) => setTimeout(res, 1000)); // fake delay

      toast.success("Message sent successfully 🚀");

      setForm({ name: "", email: "", message: "" });

    } catch (err) {
      toast.error("Failed to send message ❌");
    }

    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-slate-100 dark:bg-slate-900 flex items-center justify-center px-4">

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white dark:bg-slate-800 shadow-xl rounded-2xl p-8 w-full max-w-lg"
      >
        
        <h1 className="text-2xl font-bold text-center text-slate-800 dark:text-white mb-6">
          Contact Us
        </h1>

        <form onSubmit={handleSubmit} className="space-y-4">

          <input
            type="text"
            name="name"
            placeholder="Your Name"
            value={form.name}
            onChange={handleChange}
            className="w-full p-3 border rounded-lg bg-white dark:bg-slate-700 text-black dark:text-white focus:ring-2 focus:ring-blue-400"
          />

          <input
            type="email"
            name="email"
            placeholder="Your Email"
            value={form.email}
            onChange={handleChange}
            className="w-full p-3 border rounded-lg bg-white dark:bg-slate-700 text-black dark:text-white focus:ring-2 focus:ring-blue-400"
          />

          <textarea
            name="message"
            rows="4"
            placeholder="Your Message"
            value={form.message}
            onChange={handleChange}
            className="w-full p-3 border rounded-lg bg-white dark:bg-slate-700 text-black dark:text-white focus:ring-2 focus:ring-blue-400"
          />

          {/* 🔥 Button with loading */}
          <motion.button
            whileTap={{ scale: 0.95 }}
            disabled={loading}
            type="submit"
            className="w-full bg-blue-500 hover:bg-blue-600 text-white py-3 rounded-lg font-semibold transition disabled:opacity-50"
          >
            {loading ? "Sending..." : "Send Message"}
          </motion.button>

        </form>

        {/* Info */}
        <div className="mt-6 text-center text-sm text-gray-500 dark:text-gray-300">
          <p>Email: 2308390100015@reck.ac.in</p>
          <p>Location: India</p>
        </div>

      </motion.div>
    </div>
  );
};

export default Contact;