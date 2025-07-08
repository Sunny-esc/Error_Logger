import { useState,useEffect } from "react";
import { ChevronLeft, ChevronRight,CircleUser, Camera, FileText, FolderOpen, MoreHorizontal, Search, Plus, Calendar, Users, Coffee } from 'lucide-react';
import x1 from "../../assets/img/x1.jpg";
import axios from "axios";
export default function Newdashboard(){
    
  const [activeTab, setActiveTab] = useState('Recently');
  
  const tabs = ['Recently', 'Suggested', 'Documents', 'Images'];
  
  const notes = [
    {
      id: 1,
      title: 'To-Do',
      content: 'Morning',
      type: 'todo',
      color: 'bg-blue-50 border-blue-200',
      icon: '📋'
    },
    {
      id: 2,
      title: 'Template text',
      content: 'Right now, I have a vision for this work and this life full of...',
      type: 'text',
      color: 'bg-gray-50 border-gray-200',
      icon: '📝'
    },
    {
      id: 3,
      title: 'Project Plan',
      content: 'Make some plan 1',
      type: 'project',
      color: 'bg-green-50 border-green-200',
      icon: '📊'
    },
    {
      id: 4,
      title: 'To-Do',
      content: '1. Focus on Brain Mapping\n2. Get a new book\n3. Define 50 ideas (GTD)',
      type: 'todo',
      color: 'bg-yellow-50 border-yellow-200',
      icon: '✅'
    },
    {
      id: 5,
      title: 'Meeting Brief',
      content: 'Summarized the task and presented the meeting brief',
      type: 'meeting',
      color: 'bg-purple-50 border-purple-200',
      icon: '🤝'
    },
    {
      id: 6,
      title: 'Drinks!!!',
      content: 'Alamo Drafthouse Cinema South Lamar',
      type: 'social',
      color: 'bg-pink-50 border-pink-200',
      icon: '🍹'
    }
  ];

  const quickTips = [
    {
      icon: <Camera className="w-8 h-8 text-blue-500" />,
      title: 'Scan with your camera',
      description: 'Turn your old notes into digital ones'
    },
    {
      icon: <FileText className="w-8 h-8 text-orange-500" />,
      title: 'Draw your notes',
      description: 'Everything is saved in happening'
    },
    {
      icon: <FolderOpen className="w-8 h-8 text-green-500" />,
      title: 'Plan your projects',
      description: 'Easier to plan your projects'
    }
  ];

  const quickNotes = [
    'Read every Instagram event 17 August (Independence Day)',
    'Create clients feedback on Figma ASAP',
    'Copy files on your cloud storage'
  ];

  const [loggedInUser, setLoggedInUser] = useState(null);

  const [openUser, setOpenUser] = useState(null);
    const [openUserz, setOpenUserz] = useState(null);
  const [users, setUsers] = useState([]);

    const handleUserClick = (userId) => {
    setOpenUser(openUserz === userId ? null : userId);
  };

  useEffect(() => {
    const fetchProfile = async () => {
      try {
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
      } catch (err) {
        console.log("error fetching", err);
        toast.error("error");
      }
   
    };
   fetchProfile();
  
  },[]);

  //time giver
    const timer= () => {
      const today = new Date();
      const time = today.getHours();
      
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









       
const date=()=>{
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
}
 const [dates, setdate] = useState(date);
    useEffect(() => {
      const interval = setInterval(() => {
        setdate(date);
      },1000);
      return () => clearInterval(interval);
    }, []);
    
    return (
      <>
        <div className="min-h-screen bg-gradient-to-br from-gray-100 to-gray-200">
          {/* Header */}
          <div className="relative bg-white shadow-sm">
            <div className="absolute inset-0">
              <img
                src={x1}
                alt="Background"
                className="w-full h-full object-cover opacity-80"
              />
            </div>

            <div className="relative px-6 py-8">
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center space-x-4">
                  <button className="p-2 rounded-full bg-white/20 hover:bg-white/30 transition-colors">
                    <ChevronLeft className="w-5 h-5 text-gray-600" />
                  </button>
                  <button className="p-2 rounded-full bg-white/20 hover:bg-white/30 transition-colors">
                    <ChevronRight className="w-5 h-5 text-gray-600" />
                  </button>
                </div>

                <div className="flex cursor-pointer items-center space-x-3 bg-black/80 text-white px-4 py-2 rounded-full">
                  {users.map((u) => (
                    <div
                      key={u._id}
                      onClick={() => handleUserClick(u._id)}
                      className="  transition-colors duration-200"
                    >
                      <div className="p-1 bg-black flex gap-2 text-white rounded-xl shadow-md w-full max-w-md">
                        <div className="w-8 h-8 bg-gray-400 rounded-full flex items-center justify-center">
                          
                          <CircleUser />
                        </div>
                        <span className="text-xl font-semibold ">
                          {openUser === u._id ? u.username : u.username}!{" "}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                {users.map((u) => (
                  <div
                    key={u._id}
                    onClick={() => handleUserClick(u._id)}
                    className="cursor-none transition-colors duration-200 h-fit w-fit p-4 text-center bg-white-400 rounded-md bg-clip-padding backdrop-filter backdrop-blur-lg bg-opacity-50   border-gray-100"
                  >
                    <div className="mb-2 p-2  text-white rounded-xl  w-full max-w-md">
                      <h2 className="text-xl font-semibold ">
                        {current},{" "}
                        {openUser === u._id ? u.username : u.username}!{" "}
                      </h2>
                      <p className="">"Keep pushing — you're doing great!"</p>
                    </div>
                     <p className="text-white text-sm uppercase tracking-wide">
                 
                </p>
                <span  className="text-white">

                {dates}
                </span>
                  </div>
                ))}
               
              </div>
            </div>
          </div>

          <div className="px-6 py-8">
            {/* Quick Tips and Notes */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
              {/* Quick Tips */}
              <div className="bg-white rounded-2xl p-6 shadow-lg">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-xl font-semibold text-gray-800 flex items-center">
                    <span className="mr-2">⚡</span>
                    QUICK TIPS
                  </h2>
                  <button className="p-1 hover:bg-gray-100 rounded">
                    <MoreHorizontal className="w-5 h-5 text-gray-400" />
                  </button>
                </div>

                <div className="space-y-4">
                  {quickTips.map((tip, index) => (
                    <div
                      key={index}
                      className="flex items-start space-x-4 p-3 rounded-lg hover:bg-gray-50 transition-colors"
                    >
                      <div className="p-2 bg-gray-50 rounded-lg">
                        {tip.icon}
                      </div>
                      <div>
                        <h3 className="font-medium text-gray-800">
                          {tip.title}
                        </h3>
                        <p className="text-sm text-gray-600">
                          {tip.description}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Quick Notes */}
              <div className="bg-white rounded-2xl p-6 shadow-lg">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-xl font-semibold text-gray-800 flex items-center">
                    <span className="mr-2">📝</span>
                    QUICK NOTE
                  </h2>
                  <button className="p-1 hover:bg-gray-100 rounded">
                    <MoreHorizontal className="w-5 h-5 text-gray-400" />
                  </button>
                </div>

                <div className="space-y-3">
                  {quickNotes.map((note, index) => (
                    <div key={index} className="flex items-start space-x-3">
                      <span className="text-gray-400 text-sm mt-1">
                        {index + 1}.
                      </span>
                      <p className="text-sm text-gray-700 leading-relaxed">
                        {note}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Notes Section */}
            <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
              <div className="p-6 border-b border-gray-200">
                <div className="flex items-center justify-between">
                  <h2 className="text-xl font-semibold text-gray-800 flex items-center">
                    <span className="mr-2">📋</span>
                    NOTES
                  </h2>
                  <div className="flex items-center space-x-4">
                    <button className="p-2 hover:bg-gray-100 rounded-lg">
                      <Search className="w-5 h-5 text-gray-400" />
                    </button>
                    <button className="p-1 hover:bg-gray-100 rounded">
                      <MoreHorizontal className="w-5 h-5 text-gray-400" />
                    </button>
                  </div>
                </div>

                {/* Tabs */}
                <div className="flex space-x-6 mt-6">
                  {tabs.map((tab) => (
                    <button
                      key={tab}
                      onClick={() => setActiveTab(tab)}
                      className={`text-sm font-medium pb-2 border-b-2 transition-colors ${
                        activeTab === tab
                          ? "border-green-500 text-green-600"
                          : "border-transparent text-gray-500 hover:text-gray-700"
                      }`}
                    >
                      {tab}
                    </button>
                  ))}
                </div>
              </div>

              {/* Notes Grid */}
              <div className="p-6">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {notes.map((note) => (
                    <div
                      key={note.id}
                      className={`${note.color} border-2 rounded-xl p-4 hover:shadow-md transition-shadow cursor-pointer`}
                    >
                      <div className="flex items-start justify-between mb-3">
                        <h3 className="font-semibold text-gray-800 text-sm">
                          {note.title}
                        </h3>
                        <span className="text-lg">{note.icon}</span>
                      </div>
                      <p className="text-xs text-gray-600 line-clamp-3 whitespace-pre-line">
                        {note.content}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Add New Button */}
            <div className="fixed bottom-6 right-6">
              <button className="bg-green-500 hover:bg-green-600 text-white p-4 rounded-full shadow-lg hover:shadow-xl transition-all duration-200 flex items-center space-x-2">
                <Plus className="w-6 h-6" />
                <span className="font-medium">New</span>
              </button>
            </div>
          </div>
        </div>
      </>
    );
}