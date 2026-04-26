import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import { Toaster } from "react-hot-toast";
import { useEffect, useState } from "react";

// 🔥 Firebase
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "./firebase";
import Navbar from "./Components/Navbar";
import Footer from "./Components/Footer";
import History from "./pages/History";
import Home from "./pages/Home";
import Predict from "./pages/Predict";
import Dashboard from "./pages/Dashboard";
import About from "./pages/About";
import Contact from "./pages/Contact";
import Login from "./pages/Login";
import Result from "./pages/Result";
import Profile from "./pages/Profile";
import Signup from "./pages/Signup"; // 🔥 missing था
import Protected from "./Components/Protected";
import ResetPassword from "./pages/ResetPassword";

// 🔥 Scroll to top
function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
}

function AnimatedRoutes() {
  const location = useLocation();

  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        
        <Route path="/" element={<PageWrapper><Home /></PageWrapper>} />
        <Route path="/predict" element={<PageWrapper><Predict /></PageWrapper>} />
        <Route path="/about" element={<PageWrapper><About /></PageWrapper>} />
        <Route path="/contact" element={<PageWrapper><Contact /></PageWrapper>} />
        <Route path="/result" element={<PageWrapper><Result /></PageWrapper>} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/reset-password" element={<ResetPassword />} />
        

        {/* 🔐 Protected Routes */}
        <Route 
          path="/dashboard" 
          element={
            <Protected>
              <PageWrapper><Dashboard /></PageWrapper>
            </Protected>
          } 
        />

        <Route 
          path="/profile" 
          element={
            <Protected>
              <PageWrapper><Profile /></PageWrapper>
            </Protected>
          } 
        />

        <Route 
          path="/history" 
          element={
            <Protected>
              <PageWrapper><History /></PageWrapper>
            </Protected>
          } 
        />

      </Routes>
    </AnimatePresence>
  );
}

const PageWrapper = ({ children }) => (
  <motion.div
    initial={{ opacity: 0, y: 40 }}
    animate={{ opacity: 1, y: 0 }}
    exit={{ opacity: 0, y: -40 }}
    transition={{ duration: 0.4 }}
  >
    {children}
  </motion.div>
);

function App() {
  const [user, setUser] = useState(null);

  // 🔥 Firebase Auth Listener
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        console.log("Logged in:", user.email);
        setUser(user);
      } else {
        console.log("Logged out");
        setUser(null);
      }
    });

    return () => unsubscribe();
  }, []);

  return (
    <Router>
      <ScrollToTop />

      <Navbar user={user} /> {/* 🔥 pass user */}

      <Toaster position="top-center" reverseOrder={false} />

      <AnimatedRoutes />

      <Footer />
    </Router>
  );
}

export default App;