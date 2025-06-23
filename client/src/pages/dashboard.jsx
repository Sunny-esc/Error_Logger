import react1 from "../assets/svgs/logo/react1.svg";
import axios from "axios";
import { DotLottieReact } from "@lottiefiles/dotlottie-react";

import Expand from "./dashboard/components/nav";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router";
import { Toaster, toast } from "react-hot-toast";
import Notes from "./notes";
import Notesaved from "./stored";
import Profile from "./profile";
import Sidecontent from "./sidecontent";

export default function Dashboard() {
  const [loggedInUser, setLoggedInUser] = useState(null);
  const [users, setUsers] = useState([]);
  const [usersz, setUsersz] = useState([]);
  const [openUserz, setOpenUserz] = useState(null);
  const [openUser, setOpenUser] = useState(null);

  //posts show
  const handleUserClick = (userId) => {
    setOpenUser(openUserz === userId ? null : userId);
  };

  
  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await axios.get(
          "http://localhost:3000/api/auth/profile",
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
      } catch (err) {
        console.log("error fetching", err);
        toast.error("error");
      }
    };
    const fetcherros = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await axios.get("http://localhost:3000/api/all", {
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
  const time = () => {
    const today = new Date();
    const time = today.getHours();
    if (time >= 11) {
      return `Good Afternoon ☀️`;
    } else if (time >= 17) {
      return `Good Evening 🌆`;
    } else {
      return `Good Morning 🌅`;
    }
  };
  const [current, setCurrent] = useState(time);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrent(time);
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  //show up setting
  const [activeTab, setActiveTab] = useState("dashboard"); // "dashboard", "notes", or "saved"

  return (
    <>
      <div>
        <div className="flex flex-col md:flex-row gap-2 min-h-screen ">
          <div className="w-full md:w-[15%] ">
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
            />
          </div>
          <div className=" w-full md:w-[1/2] p-4 md:p-8  ">
            {" "}
            {activeTab === "dashboard" && (
              <div>
                <h1 className="text-2xl md:text-4xl font-bold mb-4 md:mb-2">
                  Dashboard
                </h1>
                <p className="text-base md:text-lg">
                  Welcome to your dashboard!
                </p>
                <DotLottieReact
                  src="https://lottie.host/a399fd7a-3fd0-4aef-97d4-2c2246d06440/jeWP0EyZCx.lottie"
                  loop
                  autoplay
                  className="w-70"
                />

                {users.map((u) => (
                  <div
                    key={u._id}
                    onClick={() => handleUserClick(u._id)}
                    className="cursor-pointer  transition-colors duration-200"
                  >
                    <div className="mb-6 p-4 bg-white rounded-xl shadow-md w-full max-w-md">
                      <h2 className="text-xl font-semibold text-gray-700">
                        {current},{" "}
                        {openUser === u._id ? u.username : u.username}!{" "}
                      </h2>
                      <p className="text-gray-500">
                        "Keep pushing — you're doing great!"
                      </p>
                    </div>
                  </div>
                ))}
                {/*POST COUNTING */}
                {Object.entries(postCounts).map(([userId, count]) => (
                  <div
                    className="w-full max-w-md bg-white rounded-xl p-4 shadow-md"
                    key={userId}
                  >
                    <h3 className="text-lg font-semibold mb-4 text-gray-700">
                      Progress Overview
                    </h3>
                    <div className="flex justify-between text-center">
                      <div>
                        <p className="text-2xl font-bold text-blue-600">
                          {count}!
                        </p>
                        <span className="text-sm text-gray-500">Posts</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
            <div className="mt-6 md:mt-2">
              {activeTab === "notes" && (
                <div>
                  <Notes />
                </div>
              )}

              {activeTab === "saved" && (
                <div>
                  <Notesaved />
                </div>
              )}
              {activeTab === "profile" && (
                <div>
                  <Profile />
                </div>
              )}
            </div>
          </div>
          <div className=" w-full h-[80%] md:w-[32%] p-4 md:p-4 space-y-6  ">
            <div className="flex flex-col  h-full">
              <h2 className="text-xl md:text-2xl font-semibold mb-2 md:mb-4">
                Dashboard Content
              </h2>
              <p className="">content overview.</p>
              <div>
                <Sidecontent />
              </div>
            </div>
            <div className="bg-white text-gray-800 rounded-xl p-4 shadow-md w-full max-w-md">
              <h3 className="text-lg font-semibold mb-2">Recent Activity</h3>
              <ul className="text-sm text-gray-700 space-y-2">
                <li>✔️ Resolved issue in "Error Logger" project</li>
                <li>📝 Updated notes comp</li>
                <li>📁 Created new Features: "JSX Snippets"</li>
              </ul>
            </div>
          </div>
        </div>
        <div className=" flex items-center p-4 flex-col md:flex-row bg-gray-800 text-white text-shadow-2xs justify-around  ">
          {" "}
          <h1 className=" text-xl md:text-2xl font-bold mb-2 md:mb-">Logo</h1>
          <p className="text-base md:text-lg ">Welcome to your dashboard!</p>
        </div>
      </div>
    </>
  );
}
