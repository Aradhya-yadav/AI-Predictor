import { useEffect, useState } from "react";
import { auth } from "../firebase";
import { updateProfile, onAuthStateChanged } from "firebase/auth";
import toast from "react-hot-toast";

const Profile = () => {
  const [user, setUser] = useState(null);
  const [name, setName] = useState("");
  const [photo, setPhoto] = useState("");
  const [loading, setLoading] = useState(false);
  const [editing, setEditing] = useState(false);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      if (currentUser) {
        setUser(currentUser);
        setName(currentUser.displayName || "");
        setPhoto(currentUser.photoURL || "");
      }
    });

    return () => unsubscribe();
  }, []);

  const handleUpdate = async () => {
    if (!name) {
      toast.error("Name cannot be empty ❌");
      return;
    }

    setLoading(true);

    try {
      await updateProfile(auth.currentUser, {
        displayName: name,
        // 🔥 FIX: fallback avatar if photo empty
        photoURL: photo || `https://ui-avatars.com/api/?name=${name}`
      });

      toast.success("Profile updated successfully 🎉");
      setEditing(false);

      // 🔥 FIX: navbar refresh
      window.location.reload();

    } catch (err) {
      toast.error("Update failed ❌");
    }

    setLoading(false);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-100 dark:bg-slate-900 p-4">
      <div className="bg-white dark:bg-slate-800 p-8 rounded-2xl shadow-xl w-full max-w-md">

        <h2 className="text-2xl font-bold text-center mb-6 text-slate-800 dark:text-white">
          Profile ✏️
        </h2>

        {/* Profile Image */}
        <div className="flex flex-col items-center mb-4">
          <img
            // 🔥 FIX: dynamic fallback
            src={
              photo ||
              `https://ui-avatars.com/api/?name=${name || "User"}`
            }
            alt="profile"
            className="w-24 h-24 rounded-full border shadow"
          />
          <p className="text-xs text-gray-500 mt-2">
            Preview
          </p>
        </div>

        {/* Email */}
        <div className="mb-4">
          <label className="text-sm text-gray-500">Email</label>
          <p className="font-semibold text-slate-800 dark:text-white">
            {user?.email}
          </p>
        </div>

        {/* Name */}
        <div className="mb-4">
          <label className="text-sm text-gray-500">Name</label>
          <input
            type="text"
            value={name}
            disabled={!editing}
            onChange={(e) => setName(e.target.value)}
            className="w-full mt-1 p-3 border rounded-lg dark:bg-slate-700 dark:text-white focus:ring-2 focus:ring-blue-400 disabled:opacity-50"
          />
        </div>

        {/* Photo URL */}
        <div className="mb-6">
          <label className="text-sm text-gray-500">Photo URL</label>
          <input
            type="text"
            value={photo}
            disabled={!editing}
            onChange={(e) => setPhoto(e.target.value)}
            placeholder="Paste image URL or leave empty"
            className="w-full mt-1 p-3 border rounded-lg dark:bg-slate-700 dark:text-white focus:ring-2 focus:ring-blue-400 disabled:opacity-50"
          />
        </div>

        {/* Buttons */}
        {!editing ? (
          <button
            onClick={() => setEditing(true)}
            className="w-full bg-gray-500 hover:bg-gray-600 text-white py-3 rounded-lg"
          >
            Edit Profile
          </button>
        ) : (
          <div className="flex gap-3">
            <button
              onClick={handleUpdate}
              disabled={loading}
              className="flex-1 bg-blue-500 hover:bg-blue-600 text-white py-3 rounded-lg disabled:opacity-50"
            >
              {loading ? "Saving..." : "Save"}
            </button>

            <button
              onClick={() => {
                setEditing(false);
                setName(user?.displayName || "");
                setPhoto(user?.photoURL || "");
              }}
              className="flex-1 bg-red-500 hover:bg-red-600 text-white py-3 rounded-lg"
            >
              Cancel
            </button>
          </div>
        )}

      </div>
    </div>
  );
};

export default Profile;