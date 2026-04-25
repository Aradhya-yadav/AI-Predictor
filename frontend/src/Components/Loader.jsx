import { motion } from "framer-motion";

const Loader = ({ text = "Loading..." }) => {
  return (
    <div className="fixed inset-0 flex flex-col items-center justify-center bg-black/20 backdrop-blur-sm z-50">
      
      {/* Spinner */}
      <motion.div
        className="w-14 h-14 border-4 border-blue-500 border-t-transparent rounded-full"
        animate={{ rotate: 360 }}
        transition={{ repeat: Infinity, duration: 1, ease: "linear" }}
      />

      {/* Text */}
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ repeat: Infinity, duration: 1, repeatType: "reverse" }}
        className="mt-4 text-white font-medium text-lg"
      >
        {text}
      </motion.p>

    </div>
  );
};

export default Loader;