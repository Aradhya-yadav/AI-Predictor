import { Navigate, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import { auth } from "../firebase";
import { onAuthStateChanged } from "firebase/auth";
import toast from "react-hot-toast";

const Protected = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const location = useLocation();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  // ⏳ wait
  if (loading) {
    return <div className="text-center mt-20">Loading...</div>;
  }

  // ❌ not logged in
  if (!user) {
    if (!toast.isActive("login-error")) {
      toast.dismiss();
      toast.error("Please login first 🔒", { id: "login-error" });
    }

    return (
      <Navigate
        to="/login"
        state={{ from: location }}
        replace
      />
    );
  }

  // ✅ logged in
  return children;
};

export default Protected;