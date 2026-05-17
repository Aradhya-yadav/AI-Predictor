import { useState } from "react";
import toast from "react-hot-toast";
import { motion } from "framer-motion";

const InputForm = ({ onSubmit }) => {
  const [formData, setFormData] = useState({
    hours: "",
    attendance: "",
    marks: "",
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const { hours, attendance, marks } = formData;

    // 🔥 Validation
    if (!hours || !attendance || !marks) {
      toast.error("Please fill all fields ❗");
      return;
    }

    if (attendance > 100) {
      toast.error("Attendance cannot exceed 100%");
      return;
    }

    if (marks > 100) {
      toast.error("Marks cannot exceed 100");
      return;
    }

    if (hours < 0 || attendance < 0 || marks < 0) {
      toast.dismiss();
      toast.error("Values cannot be negative ❌");
      return;
    }

    try {
      setLoading(true);

      await onSubmit(formData); // 🔥 wait for backend

    } catch (err) {
      toast.dismiss();
      toast.error("Prediction failed ❌");
    }

    setLoading(false);
  };

  return (
    <div className="flex justify-center mt-10">
      
      <motion.form
        onSubmit={handleSubmit}
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white dark:bg-slate-800 shadow-xl rounded-2xl p-8 w-full max-w-md space-y-5"
      >
        <h2 className="text-2xl font-bold text-center text-slate-800 dark:text-white">
          Enter Student Details
        </h2>

        {/* Study Hours */}
        <div>
          <label className="block text-sm mb-1 text-gray-700 dark:text-gray-300">
            Study Hours
          </label>
          <input
            type="number"
            name="hours"
            value={formData.hours}
            onChange={handleChange}
            placeholder="e.g. 5"
            className="w-full p-3 border rounded-lg dark:bg-slate-700 dark:text-white focus:ring-2 focus:ring-blue-400"
          />
        </div>

        {/* Attendance */}
        <div>
          <label className="block text-sm mb-1 text-gray-700 dark:text-gray-300">
            Attendance (%)
          </label>
          <input
            type="number"
            name="attendance"
            value={formData.attendance}
            onChange={handleChange}
            placeholder="e.g. 85"
            className="w-full p-3 border rounded-lg dark:bg-slate-700 dark:text-white focus:ring-2 focus:ring-blue-400"
          />
        </div>

        {/* Marks */}
        <div>
          <label className="block text-sm mb-1 text-gray-700 dark:text-gray-300">
            Previous Marks
          </label>
          <input
            type="number"
            name="marks"
            value={formData.marks}
            onChange={handleChange}
            placeholder="e.g. 75"
            className="w-full p-3 border rounded-lg dark:bg-slate-700 dark:text-white focus:ring-2 focus:ring-blue-400"
          />
        </div>

        {/* Button */}
        <motion.button
          whileTap={{ scale: 0.95 }}
          disabled={loading}
          type="submit"
          className="w-full bg-blue-500 hover:bg-blue-600 text-white py-3 rounded-lg font-semibold transition disabled:opacity-50"
        >
          {loading ? "Predicting..." : "Predict Performance"}
        </motion.button>

      </motion.form>
    </div>
  );
};

export default InputForm;