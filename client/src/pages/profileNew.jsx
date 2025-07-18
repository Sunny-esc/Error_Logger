
import axios from "axios";
import { useEffect, useState } from "react";
import {toast,Toaster} from "react-hot-toast";
import { useRef } from "react";

export default function ProfileNew() {
 

  const [loggedInUser, setLoggedInUser] = useState(null);
  const [users, setUsers] = useState([]);

  const [showEmailModal, setShowEmailModal] = useState(false);
const [newEmail, setNewEmail] = useState("");
const handleChangeEmail = async () => {
  const token = localStorage.getItem("token");

  if (!newEmail) {
    toast.error("Please enter a new email");
    return;
  }

  try {
    const res = await axios.post(
      "https://error-logger.onrender.com/api/auth/updateemail",
      { newEmail },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        withCredentials: true,
      }
    );
    toast.success(res.data.message);
    setShowEmailModal(false);
    setNewEmail("");
  } catch (err) {
    const msg = err?.response?.data?.error || "Failed to update email";
    toast.error("Failed",msg);
  }
};


  //
  const [showPasswordModal, setShowPasswordModal] = useState(false);
const [oldPassword, setOldPassword] = useState("");
const [newPassword, setNewPassword] = useState("");
const handleChangePassword = async () => {
  const token = localStorage.getItem("token");

  if (!oldPassword || !newPassword) {
    toast.error("Please enter both passwords");
    return;
  }

  try {
    const res = await axios.post(
      "https://error-logger.onrender.com/api/auth/updatepass",
      { oldPassword, newPassword },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        withCredentials: true,
      }
    );

    toast.success(res.data.message);
    setShowPasswordModal(false);
    setOldPassword("");
    setNewPassword("");
  } catch (err) {
    const msg = err?.response?.data?.error || "Error updating password";
    toast.error(msg);
  }
};

//
  const [openUser, setOpenUser] = useState(null);
  const handleUserClick = (userId) => {
    setOpenUser(openUser === userId ? null : userId);
  };

  const [loading, setLoading] = useState(false);
  useEffect(() => {
    setLoading(true);
    const fetchProfile = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await axios.get("https://error-logger.onrender.com/api/auth/profile", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
          withCredentials: true,
        });
        const user = response.data;
        setLoggedInUser(user);
        // If your API returns a list of users, set it here
        setUsers(Array.isArray(user) ? user : [user]);
      } catch (err) {
        console.log("error fetching", err);
        toast.error("error");
      } finally {
        setLoading(false);
      }
    };
    fetchProfile();
  }, []);


  return (
    <div className="mt-4 p-6 bg-gradient-to-br from-[#0f172a] to-[#1e293b] text-white rounded-2xl shadow-lg border border-gray-700 backdrop-blur-md">
  <Toaster />
  <h1 className="text-3xl font-extrabold mb-2 text-cyan-400">
    {loading ? "Loading..." : "User Details"}
  </h1>
  {!loading && loggedInUser && !loggedInUser.verified && (
  <div className="bg-yellow-100 border-l-4 border-yellow-500 text-yellow-800 p-4 mb-4 rounded-md shadow-sm">
    <p className="font-semibold">Your account is not verified.</p>
    <p className="text-sm">Please verify your account using the email sent to you. If you don’t see it, check your spam folder.</p>
  </div>
)}

  {/* User Cards */}
  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
    {users.map((u) => (
      <div
        key={u._id}
        onClick={() => handleUserClick(u._id)}
        className="bg-[#1e293b] border border-gray-600 rounded-xl p-4 shadow-md hover:shadow-cyan-500/30 transition duration-300 cursor-pointer"
      >
        <p className="mb-1 text-sm text-gray-400">Email</p>
        <p className="mb-2 font-medium text-white truncate">
          {openUser === u._id
            ? u.email
            : u.email?.length > 40
            ? u.email.slice(0, 40) + "..."
            : u.email}
        </p>

        <p className="mb-1 text-sm text-gray-400">Username</p>
        <p className="mb-2 font-medium text-white truncate">
          {openUser === u._id
            ? u.username
            : u.username?.length > 40
            ? u.username.slice(0, 40) + "..."
            : u.username}
        </p>

        <p className="mb-1 text-sm text-gray-400">Verified</p>
        <p className={`mb-2 font-bold ${u.verified ? "text-green-400" : "text-red-400"}`}>
          {u.verified ? "Yes" : "No"}
        </p>

        <p className="mb-1 text-sm text-gray-400">Created At</p>
        <p className="text-xs text-gray-500">
          {new Date(u.createdAt).toLocaleString()}
        </p>
      </div>
    ))}
  </div>

  {/* Action Buttons */}
  <div className="mt-6 flex gap-3 flex-wrap">
    <button
      onClick={() => setShowPasswordModal(true)}
      className="bg-cyan-700 hover:bg-cyan-800 text-white px-4 py-2 rounded-lg shadow transition"
    >
      Change Password
    </button>
    <button
      onClick={() => setShowEmailModal(true)}
      className="bg-indigo-700 hover:bg-indigo-800 text-white px-4 py-2 rounded-lg shadow transition"
    >
      Change Email
    </button>
  </div>

  {/* Password Modal */}
  {showPasswordModal && (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50">
      <div className="bg-[#1e293b] text-white p-6 rounded-xl w-full max-w-md shadow-xl border border-cyan-800">
        <h2 className="text-xl font-bold mb-4 text-cyan-300">Change Password</h2>
        <input
          type="password"
          placeholder="Old Password"
          className="w-full p-2 mb-3 rounded bg-gray-800 border border-gray-600 text-sm text-white"
          value={oldPassword}
          onChange={(e) => setOldPassword(e.target.value)}
        />
        <input
          type="password"
          placeholder="New Password"
          className="w-full p-2 mb-4 rounded bg-gray-800 border border-gray-600 text-sm text-white"
          value={newPassword}
          onChange={(e) => setNewPassword(e.target.value)}
        />
        <div className="flex justify-end">
          <button
            onClick={() => setShowPasswordModal(false)}
            className="mr-2 px-4 py-2 bg-gray-600 hover:bg-gray-700 rounded"
          >
            Cancel
          </button>
          <button
            onClick={handleChangePassword}
            className="px-4 py-2 bg-cyan-700 hover:bg-cyan-800 rounded text-white"
          >
            Submit
          </button>
        </div>
      </div>
    </div>
  )}

  {/* Email Modal */}
  {showEmailModal && (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50">
      <div className="bg-[#1e293b] text-white p-6 rounded-xl w-full max-w-md shadow-xl border border-indigo-800">
        <h2 className="text-xl font-bold mb-4 text-indigo-300">Change Email</h2>
        <input
          type="email"
          placeholder="New Email"
          className="w-full p-2 mb-4 rounded bg-gray-800 border border-gray-600 text-sm text-white"
          value={newEmail}
          onChange={(e) => setNewEmail(e.target.value)}
        />
        <div className="flex justify-end">
          <button
            onClick={() => setShowEmailModal(false)}
            className="mr-2 px-4 py-2 bg-gray-600 hover:bg-gray-700 rounded"
          >
            Cancel
          </button>
          <button
            onClick={handleChangeEmail}
            className="px-4 py-2 bg-indigo-700 hover:bg-indigo-800 rounded text-white"
          >
            Submit
          </button>
        </div>
      </div>
    </div>
  )}

  
</div>

  );
} 