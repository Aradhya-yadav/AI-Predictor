import { Link, useLocation, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { auth } from "../firebase";
import { onAuthStateChanged } from "firebase/auth"; // ✅ ADDED

const Navbar = () => {
  const location = useLocation();
  const navigate = useNavigate();

  // ✅ FIXED (reactive user)
  const [user, setUser] = useState(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });

    return () => unsubscribe();
  }, []);

  const [menuOpen, setMenuOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
  const [dark, setDark] = useState(false);

  // 🌙 Load theme
  useEffect(() => {
    const saved = localStorage.getItem("theme");

    if (saved === "dark") {
      document.documentElement.classList.add("dark");
      setDark(true);
    } else {
      document.documentElement.classList.remove("dark");
      setDark(false);
    }
  }, []);

  // 🔒 Disable scroll when menu open
  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "auto";
  }, [menuOpen]);

  // 🌙 Toggle theme
  const toggleDark = () => {
    if (dark) {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
      setDark(false);
    } else {
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
      setDark(true);
    }
  };

  const isActive = (path) =>
    location.pathname === path
      ? "text-blue-500 font-semibold"
      : "text-gray-500 hover:text-blue-500";

  const handleLogout = () => {
    auth.signOut();
    navigate("/login");
  };

  const closeMenu = () => setMenuOpen(false);

  return (
    <motion.nav
      initial={{ y: -60, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      className="bg-white dark:bg-slate-900 px-6 py-4 flex justify-between items-center sticky top-0 z-50 shadow-md"
    >
      {/* Logo */}
      <h1 className="text-xl font-bold text-blue-500">
        AI Predictor
      </h1>

      {/* Desktop Menu */}
      <div className="hidden md:flex items-center gap-6">

        <Link className={isActive("/")} to="/">Home</Link>
        <Link className={isActive("/predict")} to="/predict">Predict</Link>
        <Link className={isActive("/dashboard")} to="/dashboard">Dashboard</Link>
        <Link className={isActive("/history")} to="/history">History</Link>
        <Link className={isActive("/about")} to="/about">About</Link>
        <Link className={isActive("/contact")} to="/contact">Contact</Link>

        {/* Theme */}
        <button
          onClick={toggleDark}
          className="bg-gray-200 dark:bg-slate-700 px-3 py-1 rounded text-sm"
        >
          {dark ? "🌙" : "☀️"}
        </button>

        {/* Profile / Login */}
        {user ? (
          <div className="relative">
            <div
              onClick={() => setProfileOpen(!profileOpen)}
              className="flex items-center gap-2 cursor-pointer"
            >
              <img
                src={
                  user.photoURL ||
                  "https://ui-avatars.com/api/?name=User"
                }
                alt="profile"
                className="w-8 h-8 rounded-full border"
              />
              <span className="text-sm">
                {user.displayName || "User"}
              </span>
            </div>

            <AnimatePresence>
              {profileOpen && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="absolute right-0 mt-2 bg-white dark:bg-slate-800 rounded shadow w-32 z-50"
                >
                  <Link
                    to="/profile"
                    className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-slate-700"
                  >
                    Profile
                  </Link>

                  <button
                    onClick={handleLogout}
                    className="w-full text-left px-4 py-2 hover:bg-gray-100 dark:hover:bg-slate-700"
                  >
                    Logout
                  </button>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        ) : (
          <Link
            to="/login"
            className="bg-blue-500 text-white px-4 py-1.5 rounded"
          >
            Login
          </Link>
        )}
      </div>

      {/* Mobile Button */}
      <div className="md:hidden">
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className="text-2xl"
        >
          ☰
        </button>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="absolute top-16 left-0 w-full bg-white dark:bg-slate-900 flex flex-col items-center gap-4 py-6 shadow-lg z-50"
          >
            <Link onClick={closeMenu} to="/">Home</Link>
            <Link onClick={closeMenu} to="/predict">Predict</Link>
            <Link onClick={closeMenu} to="/dashboard">Dashboard</Link>
            <Link onClick={closeMenu} to="/history">History</Link>
            <Link onClick={closeMenu} to="/about">About</Link>
            <Link onClick={closeMenu} to="/contact">Contact</Link>

            <button onClick={toggleDark}>
              {dark ? "🌙 Dark" : "☀️ Light"}
            </button>

            {!user ? (
              <>
                <Link
                  onClick={closeMenu}
                  to="/login"
                  className="bg-blue-500 text-white px-6 py-2 rounded w-40 text-center"
                >
                  Login
                </Link>

                <Link
                  onClick={closeMenu}
                  to="/signup"
                  className="border border-blue-500 text-blue-500 px-6 py-2 rounded w-40 text-center"
                >
                  Signup
                </Link>
              </>
            ) : (
              <>
                <Link onClick={closeMenu} to="/profile">
                  Profile
                </Link>

                <button onClick={handleLogout}>
                  Logout
                </button>
              </>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
};

export default Navbar;