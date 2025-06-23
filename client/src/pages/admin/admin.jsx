import { useState, useEffect } from 'react';
import axios from 'axios';
import Logoutbutton from '../../comp/logout';
import { toast } from 'react-hot-toast';
import account from './svgs/account.svg';
import statss from './svgs/stats.svg';
import feed from './svgs/feed.svg';

export default function Admin() {
  const [feedback, setFeedback] = useState(false);
  const [stats, setStats] = useState(false);
  const [loading, setLoading] = useState(false);
  const [notes, setNotes] = useState([]);
  const [openNoteId, setOpenNoteId] = useState(null);

  const [users, setUsers] = useState([]);
  const [loggedInUser, setLoggedInUser] = useState(null);
  const [showUsers, setShowUsers] = useState(false);
  const [openUser, setOpenUser] = useState(null);

  const handleFeedbackClick = () => {
    setFeedback(!feedback);
    setStats(false);
    setShowUsers(false);
  };

  const handleStatsClick = () => {
    setStats(!stats);
    setFeedback(false);
    setShowUsers(false);
  };

  const handleUsersClick = () => {
    setShowUsers(!showUsers);
    setFeedback(false);
    setStats(false);
  };

  const handleNoteClick = (noteId) => {
    setOpenNoteId(openNoteId === noteId ? null : noteId);
  };

  const handleUserClick = (userId) => {
    setOpenUser(openUser === userId ? null : userId);
  };

  // fetch logged-in user and users list
  useEffect(() => {
    const fetchUserAndUsers = async () => {
      setLoading(true);
      try {
        const token = localStorage.getItem("token");

        const res = await axios.get("http://localhost:3000/api/auth/profile", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
          withCredentials: true,
        });

        const user = res.data;
        setLoggedInUser(user);

        // if admin, fetch all users
        if (user?.isAdmin) {
          const allUsers = await axios.get("http://localhost:3000/api/auth/usersall", {
            headers: {
              Authorization: `Bearer ${token}`,
            },
            withCredentials: true,
          });
          setUsers(allUsers.data);
        } else {
          // just show logged-in user
          setUsers([user]);
        }

      } catch (err) {
        toast.error("Error fetching user");
        console.error(err);
      }
      setLoading(false);
    };

    const fetchNotes = async () => {
      try {
        const token = localStorage.getItem("token");
        const res = await axios.get("http://localhost:3000/api/feed", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
          withCredentials: true,
        });
        setNotes(Array.isArray(res.data) ? res.data : []);
      } catch (err) {
        console.error("Error fetching feedback");
      }
    };

    fetchUserAndUsers();
    fetchNotes();
  }, []);

  return (
    <div className="flex flex-col min-h-screen">
      <header className="bg-gray-800 text-white flex p-4">
        <h1 className="text-2xl font-bold">Admin Dashboard</h1>
        <Logoutbutton />
        <div className='flex justify-end space-x-6 ml-auto mx-3'>
          <button className='bg-blue-400 rounded-xl items-center gap-2 p-2 flex h-12' onClick={handleUsersClick}>
            <img src={account} alt="" className='w-8' />
            Users
          </button>
          <button className='bg-blue-400 rounded-xl p-2 flex items-center gap-2 h-12' onClick={handleStatsClick}>
            <img src={statss} alt="" className='w-8' />
            Stats
          </button>
          <button className='bg-blue-400 rounded-xl p-2 flex items-center gap-2 h-12' onClick={handleFeedbackClick}>
            <img src={feed} alt="" className='w-8' />
            Feedback & Contact
          </button>
        </div>
      </header>

      <main className="flex-grow p-6">
        {!feedback && !stats && !showUsers && (
          <>
            <h2 className="text-xl font-semibold mb-4">Welcome to the Admin Panel</h2>
            <p className="text-md">
              Here you can manage users, view statistics, and perform administrative tasks.
            </p>
          </>
        )}

        {feedback && (
          <div className="bg-gray-100 p-4 rounded-lg shadow-md mb-4">
            <h3 className="text-lg font-semibold mb-2">Feedback & Contact</h3>
            <p>Here you can view user feedback and contact messages.</p>
          </div>
        )}

        {stats && (
          <div className="bg-gray-100 p-4 rounded-lg shadow-md mb-4">
            <h3 className="text-lg font-semibold mb-2">Statistics</h3>
            <p>Total Users: {users.length}</p>
            <p>Total Feedback: {notes.length}</p>
          </div>
        )}

        {/* Feedback Table */}
        {feedback && (
          <div className="mt-1">
            <h2 className="text-lg font-semibold mb-2">Saved Feedback:</h2>
            <table className="w-full table-auto border border-black">
              <thead>
                <tr>
                  <th className="border px-4 py-2">Message</th>
                  <th className="border px-4 py-2">Email</th>
                  <th className="border px-4 py-2">Timestamp</th>
                </tr>
              </thead>
              <tbody>
                {notes.map((note) => (
                  <tr
                    key={note._id}
                    onClick={() => handleNoteClick(note._id)}
                    className="cursor-pointer hover:bg-gray-100"
                  >
                    <td className="border px-4 py-2">
                      {openNoteId === note._id
                        ? note.message
                        : (note.message?.length > 100
                          ? note.message.slice(0, 100) + "..."
                          : note.message)}
                    </td>
                    <td className="border px-4 py-2">{note.email}</td>
                    <td className="border px-4 py-2 text-xs text-gray-500">
                      {new Date(note.createdAt).toLocaleString()}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {/* Users Table */}
        {showUsers && (
         <div className="mt-4 p-4 bg-white rounded-2xl shadow-md">
  <h1 className="text-2xl font-bold mb-2">
    {loading ? "Loading..." : "User Details"}
  </h1>
  <h2 className="text-xl font-semibold mb-4 text-gray-700">Registered Users</h2>
  <div className="overflow-x-auto">
    <table className="w-full table-auto border border-gray-300 rounded-lg overflow-hidden">
      <thead className="bg-gray-100 text-gray-700">
        <tr>
          <th className="border px-6 py-3 text-left">Email</th>
          <th className="border px-6 py-3 text-left">Username</th>
          <th className="border px-6 py-3 text-left">Password</th>
          <th className="border px-6 py-3 text-left">Admin</th>
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
            <td className="border px-6 py-2 text-red-600 font-mono">
              {openUser === u._id
                ? u.password
                : u.password?.length > 40
                ? u.password.slice(0, 40) + "..."
                : u.password}
            </td>
            <td className="border px-6 py-2 font-semibold text-green-600">
              {u.isAdmin ? "Yes" : "No"}
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

        )}
      </main>

      <footer className="bg-gray-800 text-white p-4 text-center">
        &copy; {new Date().getFullYear()} Admin Dashboard
      </footer>
    </div>
  );
}
