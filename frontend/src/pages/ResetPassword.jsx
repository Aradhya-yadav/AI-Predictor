import { useState, useEffect } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import { auth } from "../firebase";
import { confirmPasswordReset, verifyPasswordResetCode } from "firebase/auth";
import toast from "react-hot-toast";

const ResetPassword = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  const [newPass, setNewPass] = useState("");
  const [loading, setLoading] = useState(false);
  const [validCode, setValidCode] = useState(false);

  const oobCode = searchParams.get("oobCode");

  // 🔍 Verify reset code
  useEffect(() => {
    const checkCode = async () => {
      try {
        await verifyPasswordResetCode(auth, oobCode);
        setValidCode(true);
      } catch (err) {
        toast.error("Invalid or expired link ❌");
      }
    };

    if (oobCode) checkCode();
  }, [oobCode]);

  const handleReset = async () => {
    if (!newPass || newPass.length < 6) {
      toast.error("Password must be at least 6 characters ❗");
      return;
    }

    setLoading(true);

    try {
      await confirmPasswordReset(auth, oobCode, newPass);

      toast.success("Password reset successful 🎉");

      navigate("/login");
    } catch (err) {
      console.log(err.code);
      toast.error("Reset failed ❌");
    }

    setLoading(false);
  };

  if (!validCode) {
    return <div className="text-center mt-20">Checking link...</div>;
  }

  return (
    <div className="min-h-screen flex justify-center items-center bg-slate-100 dark:bg-slate-900 px-4">
      <div className="bg-white dark:bg-slate-800 p-6 rounded-xl shadow w-80">

        <h2 className="text-xl font-bold mb-4 text-center text-slate-800 dark:text-white">
          Set New Password 🔐
        </h2>

        <input
          type="password"
          placeholder="Enter new password"
          value={newPass}
          onChange={(e) => setNewPass(e.target.value)}
          className="w-full mb-3 p-2 border rounded dark:bg-slate-700 dark:text-white"
        />

        <button
          onClick={handleReset}
          disabled={loading}
          className="w-full bg-blue-500 hover:bg-blue-600 text-white py-2 rounded disabled:opacity-50"
        >
          {loading ? "Updating..." : "Update Password"}
        </button>

      </div>
    </div>
  );
};

export default ResetPassword;