import axios from "axios";
import { useEffect, useState } from "react";
import {toast,Toaster} from "react-hot-toast";

export default function Profile() {
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
    <>
      <div className="mt-4 p-4 text-black bg-white rounded-2xl shadow-md">
                <Toaster/>

  <h1 className="text-2xl font-bold mb-2">
    {loading ? "Loading..." : "User Details"}
  </h1>
    {!loading && loggedInUser && !loggedInUser.verified && (
  <div className="bg-yellow-100 border-l-4 border-yellow-500 text-yellow-800 p-4 mb-4 rounded-md shadow-sm">
    <p className="font-semibold">Your account is not verified.</p>
    <p className="text-sm">Please verify your account using the email sent to you. If you don’t see it, check your spam folder.</p>
  </div>
)}
  <div className="overflow-x-auto">
    <table className="w-full table-auto border border-gray-300 rounded-lg overflow-hidden">
      <thead className="bg-gray-100 text-gray-700">
        <tr>
          <th className="border px-6 py-3 text-left">Email</th>
          <th className="border px-6 py-3 text-left">Username</th>
          <th className="border px-6 py-3 text-left">Verified</th>
          <th className="border px-6 py-3 text-left">Timestamp</th>
        </tr>
      </thead>
      <tbody>
        {users.map((u) => (
          <tr
            key={u._id}
            onClick={() => handleUserClick(u._id)}
            className="cursor-pointer hover:bg-gray-50 transition-colors duration-200"
          >
            <td className="border px-6 py-2">
              {openUser === u._id
                ? u.email
                : u.email?.length > 40
                ? u.email.slice(0, 40) + "..."
                : u.email}
            </td>
            <td className="border px-6 py-2">
              {openUser === u._id
                ? u.username
                : u.username?.length > 40
                ? u.username.slice(0, 40) + "..."
                : u.username}
            </td>
            
            <td className="border px-6 py-2 font-semibold text-green-600">
              {u.verified ? "Yes" : "No"}
            </td>
            <td className="border px-6 py-2 text-xs text-gray-500">
              {new Date(u.createdAt).toLocaleString()}
            </td>
          </tr>
        ))}
      </tbody>
    </table>


  </div>
</div>

    </>
  );
}
