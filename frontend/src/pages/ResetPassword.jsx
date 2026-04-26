import { useState } from "react";
import { auth } from "../firebase";
import { reauthenticateWithCredential, EmailAuthProvider, updatePassword } from "firebase/auth";
import toast from "react-hot-toast";

const ResetPassword = () => {
  const [oldPass, setOldPass] = useState("");
  const [newPass, setNewPass] = useState("");

  const handleReset = async () => {
    try {
      const user = auth.currentUser;

      if (!user) {
        toast.error("Login first ❌");
        return;
      }

      // 🔐 Re-authenticate
      const credential = EmailAuthProvider.credential(
        user.email,
        oldPass
      );

      await reauthenticateWithCredential(user, credential);

      // 🔥 Update password
      await updatePassword(user, newPass);

      toast.success("Password updated successfully 🔐");

    } catch (err) {
      if (err.code === "auth/wrong-password") {
        toast.error("Old password incorrect ❌");
      } else if (err.code === "auth/weak-password") {
        toast.error("New password too weak ❌");
      } else {
        toast.error("Error updating password ❌");
      }
    }
  };

  return (
    <div className="min-h-screen flex justify-center items-center">
      <div className="bg-white p-6 rounded shadow w-80">

        <h2 className="text-xl font-bold mb-4 text-center">
          Reset Password 🔐
        </h2>

        <input
          type="password"
          placeholder="Old Password"
          value={oldPass}
          onChange={(e) => setOldPass(e.target.value)}
          className="w-full mb-3 p-2 border rounded"
        />

        <input
          type="password"
          placeholder="New Password"
          value={newPass}
          onChange={(e) => setNewPass(e.target.value)}
          className="w-full mb-3 p-2 border rounded"
        />

        <button
          onClick={handleReset}
          className="w-full bg-blue-500 text-white py-2 rounded"
        >
          Update Password
        </button>

      </div>
    </div>
  );
};

export default ResetPassword;