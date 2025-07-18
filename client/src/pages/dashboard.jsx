import react1 from "../assets/svgs/logo/react1.svg";
import axios from "axios";
import { DotLottieReact } from "@lottiefiles/dotlottie-react";
import Expand from "./dashboard/components/nav";
import Mobilenav  from "./dashboard/components/mobilemenu";

import { useState, useEffect } from "react";
import { Toaster, toast } from "react-hot-toast";
import Notes from "./notes";
import Notesaved from "./StoredNotes/stored";
import Profile from "./profile";
import Sidebar from "./dashboard/sidebar";
import Testo from "./example";
import Auth from "../login/auth"; 
import { useNavigate,useLocation } from "react-router";
import { 
  Code, FileText, Calendar, TrendingUp, Users, Activity, BarChart3, 
  PieChart, Clock, Star, Search, Filter, Download, Share2, Edit, 
  Trash2, Eye, Copy, Plus, RefreshCw, Terminal, Zap, Globe, 
  Settings, User, Bell, Menu, X 
} from "lucide-react";
import AiDashboard from "./aiDashboard";

import Skeleton from '@mui/material/Skeleton';
import ProfileNew from "./profileNew";
export default function Dashboard() {
  const [loggedInUser, setLoggedInUser] = useState(null);
  const [users, setUsers] = useState([]);
  const [usersz, setUsersz] = useState([]);
  const [openUserz, setOpenUserz] = useState(null);
  const [openUser, setOpenUser] = useState(null);
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

  
  //posts show
  const handleUserClick = (userId) => {
    setOpenUser(openUserz === userId ? null : userId);
  };

  // Helper functions for the dashboard
  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text);
    toast.success("Copied to clipboard!");
  };

  const getLanguageColor = (lang) => {
    const languageOptions = [
      { value: "javascript", color: "bg-yellow-500" },
      { value: "python", color: "bg-blue-500" },
      { value: "java", color: "bg-red-500" },
      { value: "css", color: "bg-blue-400" },
      { value: "html", color: "bg-orange-500" },
      { value: "jsx", color: "bg-cyan-500" },
      { value: "cpp", color: "bg-purple-500" },
      { value: "csharp", color: "bg-green-500" },
      { value: "rust", color: "bg-orange-600" },
    ];
    return languageOptions.find(opt => opt.value === lang)?.color || "bg-gray-500";
  };

  const getLanguageStats = (notes) => {
    const languageCount = {};
    notes.forEach(note => {
      languageCount[note.lang] = (languageCount[note.lang] || 0) + 1;
    });
    return Object.entries(languageCount).map(([lang, count]) => ({
      language: lang,
      count,
      color: getLanguageColor(lang)
    }));
  };

  const StatCard = ({ title, value, icon: Icon, color, trend }) => (
    <div className=" backdrop-blur-xl rounded-2xl border border-slate-700/50 p-6 hover:border-blue-500/50 transition-all duration-200">
      <div className="flex items-center justify-between">
        <div>
          <p className=" text-sm font-medium">{title}</p>
          <p className="text-2xl font-bold  mt-1">{value}</p>
          {trend && (
            <div className="flex items-center gap-1 mt-2">
              <TrendingUp className="w-4 h-4 text-green-400" />
              <span className="text-green-400 text-sm">{trend}</span>
            </div>
          )}
        </div>
        <div className={`p-3 rounded-xl ${color}`}>
          <Icon className="w-6 h-6 " />
        </div>
      </div>
    </div>
  );

  const location = useLocation();

  useEffect(() => {
    const queryParams = new URLSearchParams(location.search);
    const token = queryParams.get("token");

    if (token) {
      try {
        localStorage.setItem("token", token);
        const decoded = jwtDecode(token);

        // optional: set flags for Auth
        Auth.isUser = true;
        Auth.isAdmin = decoded?.isAdmin || false;

        // Clean the URL (remove ?token=...)
        navigate("/dashboard", { replace: true });
      } catch (err) {
        console.error("Invalid token format");
        localStorage.removeItem("token");
      }
    }
  }, [location, navigate]);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        setLoading(true);
        const token = localStorage.getItem("token");
        const response = await axios.get(
          "https://error-logger.onrender.com/api/auth/profile",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
            withCredentials: true,
          }
        );
        const user = response.data;

        setLoggedInUser(user);
        setUsers(Array.isArray(user) ? user : [user]);
        setLoading(false);
      } catch (err) {
        console.log("error fetching", err);
        toast.error("error");
      }
    };
    const fetcherros = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await axios.get("https://error-logger.onrender.com/api/all", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
          withCredentials: true,
        });
        const user = response.data;

        setUsersz(Array.isArray(user) ? user : [user]);
      } catch (err) {
        console.log("error fetching", err);
        toast.error("error");
      }
    };

    fetchProfile();
    fetcherros();
  }, []);
  // 1. Group posts by user ID
  const postCounts = usersz.reduce((acc, post) => {
    acc[post.userId] = (acc[post.userId] || 0) + 1;
    return acc;
  }, {});

  //time giver
  const timer= () => {
    const today = new Date();
    const time = today.getHours();
    console.log(time);
   
if (time < 12) {
  return `Good Morning 🌅`;
} else if (time < 18) {
  return `Good Afternoon ☀️`;
} else {
  return `Good Evening 🌆`;
}
  };
  const [current, setCurrent] = useState(timer);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrent(timer);
    },60* 1000);
    return () => clearInterval(interval);
  }, []);

  // Date function
  const date = () => {
    const pad = (n) => n.toString().padStart(2, '0');
    const today = new Date();

    const hours = pad(today.getHours());
    const minutes = pad(today.getMinutes());
    const seconds = pad(today.getSeconds());
    const day = pad(today.getDate());
    const year = today.getFullYear();

    const monthNames = [
      "January", "February", "March", "April", "May", "June",
      "July", "August", "September", "October", "November", "December"
    ];
    const month = monthNames[today.getMonth()];

    return `${hours}:${minutes}:${seconds} | ${day} ${month} ${year}`;
  };
  const [dates, setdate] = useState(date);
  useEffect(() => {
    const interval = setInterval(() => {
      setdate(date);
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  //show up setting
  const [activeTab, setActiveTab] = useState("dashboard"); // "dashboard", "notes", or "saved"


  const [showProfile, setShowProfile] = useState(false);

const handlePClick = () => {
  setShowProfile(!showProfile);
};
  return (
    <>
      <div>
        <div className="flex flex-col md:flex-row gap-2 min-h-screen ">
          <div className="w-full md:w-[15%] ">
            
            {/* imported from mobile.jsx mobile nav bar */}

            <div className="md:hidden">
            <Mobilenav  onNotesClick={() =>
                setActiveTab((prev) =>
                  prev === "notes" ? "dashboard" : "notes"
          )
        }
        onsaved={() =>
          setActiveTab((prev) =>
            prev === "saved" ? "dashboard" : "saved"
      )
              }
              onprofile={() =>
                setActiveTab((prev) =>
                  prev === "profile" ? "dashboard" : "profile"
                )
              }
              onhomeClick={() =>
                setActiveTab((prev) =>
                  prev === "home" ? "dashboard" : "dashboard"
                )
              }
                onaiClick={() =>
                setActiveTab((prev) =>
                  prev === "ai" ? "dashboard" : "ai"
                )
              }
              oninfo={() =>
                setActiveTab((prev) => (prev === "info" ? "dashboard" : "info"))
              }/>
                </div>



                {/* imported from nav.jsx desktop nav bar */}
            <Expand
              onNotesClick={() =>
                setActiveTab((prev) =>
                  prev === "notes" ? "dashboard" : "notes"
                )
              }
              onsaved={() =>
                setActiveTab((prev) =>
                  prev === "saved" ? "dashboard" : "saved"
                )
              }
              onprofile={() =>
                setActiveTab((prev) =>
                  prev === "profile" ? "dashboard" : "profile"
                )
              }
              onhomeClick={() =>
                setActiveTab((prev) =>
                  prev === "home" ? "dashboard" : "dashboard"
                )
              }
              oninfo={() =>
                setActiveTab((prev) => (prev === "info" ? "dashboard" : "info"))
              }
            />
          </div>
          <div className=" w-full md:w-[1/2] p-4 md:p-8  ">
            {" "}
            {activeTab === "dashboard" && (
              <div className="min-h-screen  ">
                {/* Header */}
                <header className="border-b border-slate-700/50 p-4 hidden md:block">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <h1 className="text-2xl font-bold">Dashboard</h1>
                    </div>

                    <div className="flex items-center gap-4">
                   
                   
                      <button className="p-2 rounded-lg hover:bg-slate-300" onClick={handlePClick} >
                        <User className="w-5 h-5 " />
                        
                       
                      </button>
                    </div>
                  </div>
                </header>
                    {showProfile && <Profile />}

                <main className="p-6">
                  {/* Welcome Section */}

                  {loading ? (
                    <Skeleton
                      variant="rounded"
                      width={300}
                      height={140}
                      animation="wave"
                      sx={{ bgcolor: "slate.100" }}
                    />
                  ) : (
                    <div>
                      {users.map((u) => (
                        <div
                          key={u._id}
                          onClick={() => handleUserClick(u._id)}
                          className="border border-slate-700/50 p-6 hover:border-blue-500/50 transition-all duration-200 cursor-pointer  h-fit w-fit text-center  rounded-md bg-clip-padding backdrop-filter backdrop-blur-lg  mb-6"
                        >
                          <div className="mb-2 p-2 rounded-xl w-full max-w-md">
                            <h2 className="text-xl font-semibold">
                              {current},{" "}
                              {openUser === u._id ? u.username : u.username}!
                            </h2>
                            <p>"Keep pushing — you're doing great!"</p>
                          </div>
                          <p className=" text-sm uppercase tracking-wide">
                            {dates}
                          </p>
                        </div>
                      ))}
                    </div>
                  )}

                  {/* Stats Cards */}
                  <div className="grid mt-10 grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                    <StatCard
                      title="Total Snippets"
                      value={usersz.length}
                      icon={FileText}
                      color="bg-blue-500"
                      trend="+12%"
                    />
                   
                    <StatCard
                      title="Languages"
                      value={new Set(usersz.map((note) => note.lang)).size}
                      icon={Code}
                      color="bg-purple-500"
                    />
                    <StatCard
                      title="Today's Snippets"
                      value={
                        usersz.filter((note) => {
                          const noteDate = new Date(note.timestamp);
                          const today = new Date();
                          return (
                            noteDate.toDateString() === today.toDateString()
                          );
                        }).length
                      }
                      icon={Calendar}
                      color="bg-orange-500"
                      trend="+3"
                    />
                  </div>

                  {/* Charts Row */}
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
                    {/* Language Distribution */}
                    <div className=" backdrop-blur-xl rounded-2xl border border-slate-700/50 p-6">
                      <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                        <PieChart className="w-5 h-5" />
                        Language Distribution
                      </h3>
                      <div className="space-y-3">
                        {getLanguageStats(usersz).map(
                          ({ language, count, color }) => (
                            <div
                              key={language}
                              className="flex items-center justify-between"
                            >
                              <div className="flex items-center gap-2">
                                <div
                                  className={`w-3 h-3 rounded-full ${color}`}
                                ></div>
                                <span className="capitalize">{language}</span>
                              </div>
                              <span className="font-medium">{count}</span>
                            </div>
                          )
                        )}
                      </div>
                    </div>

                    {/* Recent Activity */}
                    <div className=" backdrop-blur-xl rounded-2xl border border-slate-700/50 p-6">
                      <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                        <Activity className="w-5 h-5" />
                        Recent Activity
                      </h3>
                      <div className="space-y-3">
                        {usersz.slice(0, 5).map((note) => (
                          <div
                            key={note._id}
                            className="flex items-center justify-between"
                          >
                            <div className="flex items-center gap-3">
                              <div className="w-2 h-2 bg-blue-400 rounded-full"></div>
                              <div>
                                <p className=" text-sm">{note.label}</p>
                                <p className=" text-xs">
                                  {new Date(
                                    note.timestamp
                                  ).toLocaleDateString()}
                                </p>
                              </div>
                            </div>
                            <div className="flex items-center gap-1 ">
                              <Eye className="w-4 h-4" />
                              <span className="text-sm">{note.views || 0}</span>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </main>
              </div>
            )}
            <div className="mt-6 md:mt-0">
              {activeTab === "notes" && (
                <div>
                  <Notes />
                </div>
              )}
              {activeTab === "ai" && (
                <div>
                  <AiDashboard />
                </div>
              )}
              {activeTab === "saved" && (
                <div>
                  <Notesaved />
                </div>
              )}
              {activeTab === "profile" && (
                <div>
                  <ProfileNew />
                </div>
              )}
              {activeTab === "info" && (
                <div>
                  <Testo />
                </div>
              )}
            </div>
          </div>
          <div className="border-l border-slate-400 hidden md:block ">
            {activeTab === "dashboard" && <Sidebar />}
          </div>
        </div>
        <div className=" flex items-center p-4 flex-col md:flex-row bg-gray-800 text-white text-shadow-2xs justify-around  ">
          {" "}
                   <p>Made by sunny 😎</p>

        </div>
      </div>
    </>
  );
}
