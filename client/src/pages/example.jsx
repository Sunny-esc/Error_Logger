import React, { useState, useEffect } from "react";
import {
  Code,
  FileText,
  Calendar,
  TrendingUp,
  Users,
  Activity,
  BarChart3,
  PieChart,
  Clock,
  Star,
  Search,
  Filter,
  Download,
  Share2,
  Edit,
  Trash2,
  Eye,
  Copy,
  Plus,
  RefreshCw,
  Terminal,
  Zap,
  Globe,
  Settings,
  User,
  Bell,
  Menu,
  X,
} from "lucide-react";
import axios from "axios";
import { toast } from "react-hot-toast";

export default function Testo() {
  const [notes, setNotes] = useState([]);
  const [filteredNotes, setFilteredNotes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedLanguage, setSelectedLanguage] = useState("all");
  const [timeFilter, setTimeFilter] = useState("all");

  const languageOptions = [
    { value: "all", label: "All Languages" },
    { value: "javascript", label: "JavaScript", color: "bg-yellow-500" },
    { value: "python", label: "Python", color: "bg-blue-500" },
    { value: "java", label: "Java", color: "bg-red-500" },
    { value: "css", label: "CSS", color: "bg-blue-400" },
    { value: "html", label: "HTML", color: "bg-orange-500" },
    { value: "jsx", label: "JSX", color: "bg-cyan-500" },
    { value: "cpp", label: "C++", color: "bg-purple-500" },
    { value: "csharp", label: "C#", color: "bg-green-500" },
    { value: "rust", label: "Rust", color: "bg-orange-600" },
  ];

  // Simulate fetching data
  useEffect(() => {
    fetchDashboardData();
  }, []);

  // Filter notes based on search and filters
  useEffect(() => {
    let filtered = notes;

    // Search filter
    if (searchQuery) {
      filtered = filtered.filter(
        (note) =>
          note.label.toLowerCase().includes(searchQuery.toLowerCase()) ||
          note.message.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    // Language filter
    if (selectedLanguage !== "all") {
      filtered = filtered.filter((note) => note.lang === selectedLanguage);
    }

    // Time filter
    if (timeFilter !== "all") {
      const now = new Date();
      const timeRanges = {
        today: 1,
        week: 7,
        month: 30,
      };

      if (timeRanges[timeFilter]) {
        const cutoff = new Date(
          now.getTime() - timeRanges[timeFilter] * 24 * 60 * 60 * 1000
        );
        filtered = filtered.filter(
          (note) => new Date(note.timestamp) >= cutoff
        );
      }
    }

    setFilteredNotes(filtered);
  }, [notes, searchQuery, selectedLanguage, timeFilter]);

  const fetchDashboardData = async () => {
    setLoading(true);
    try {
      const token = localStorage.getItem("token");
      const response = await axios.get(
        "https://error-logger.onrender.com/api/all",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
          withCredentials: true,
        }
      );
      toast.success("Notes fetched successfully!");
      const apiNotes = Array.isArray(response.data) ? response.data : [];
      setNotes(apiNotes);

      // Calculate stats from real API data
      const languageSet = new Set(apiNotes.map((note) => note.lang));
      const todayNotes = apiNotes.filter((note) => {
        const noteDate = new Date(note.timestamp);
        const today = new Date();
        return noteDate.toDateString() === today.toDateString();
      });
    } catch (err) {
      toast.error("Error fetching notes");
      setNotes([]);
    } finally {
      setLoading(false);
    }
  };

  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text);
  };
  return (
    <div className="min-h-screen">
      {/* Main Content */}
      <div className="">
        <main className="p-6">
          {/* Snippets Section */}
          <div className=" rounded-2xl border border-slate-700/50">
            <div className="p-6 border-b border-slate-700/50">
              <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4">
                <h2 className="text-xl font-bold flex items-center gap-2">
                  <Code className="w-5 h-5" />
                  Code Snippets ({filteredNotes.length})
                </h2>

                <div className="flex flex-col sm:flex-row gap-3 w-full lg:w-auto">
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4" />
                    <input
                      type="text"
                      placeholder="Search snippets..."
                      className="pl-10 pr-4 py-2  border border-slate-600/50 rounded-lg  placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 w-full sm:w-64"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                    />
                  </div>

                  <select
                    className="px-4 py-2 border border-slate-600/50 text-slate-500 rounded-lg  focus:outline-none focus:ring-2 focus:ring-blue-500"
                    value={selectedLanguage}
                    onChange={(e) => setSelectedLanguage(e.target.value)}
                  >
                    {languageOptions.map((lang) => (
                      <option key={lang.value} value={lang.value}>
                        {lang.label}
                      </option>
                    ))}
                  </select>

                  <select
                    className="px-4 py-2  border border-slate-600/50 rounded-lg text-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    value={timeFilter}
                    onChange={(e) => setTimeFilter(e.target.value)}
                  >
                    <option value="all">All Time</option>
                    <option value="today">Today</option>
                    <option value="week">This Week</option>
                    <option value="month">This Month</option>
                  </select>
                </div>
              </div>
            </div>

            <div className="p-6">
              {loading ? (
                <div className="flex items-center justify-center py-12">
                  <RefreshCw className="w-8 h-8 animate-spin text-blue-400" />
                </div>
              ) : (
                <div className="grid gap-4">
                  {filteredNotes.map((note) => (
                    <div
                      key={note._id}
                      className="bg-gray-300 rounded-xl border  border-slate-700/50 p-4 hover:border-blue-500/50 transition-all duration-200"
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-4">
                          <div className="flex items-center gap-2">
                            {note.isStarred && (
                              <Star className="w-4 h-4 text-yellow-400 fill-current" />
                            )}
                            <span className="text-slate-600 font-medium">
                              {note.label}
                            </span>
                          </div>
                          <span
                            className={`px-2 py-1 rounded-md text-xs font-medium ${
                              languageOptions.find(
                                (lang) => lang.value === note.lang
                              )?.color || "bg-gray-500"
                            } text-white`}
                          >
                            {note.lang}
                          </span>
                          <span className="text-slate-500 text-sm">
                            {new Date(note.timestamp).toLocaleDateString()}
                          </span>
                        </div>

                        <div className="flex items-center gap-2">
                          <button
                            onClick={() => copyToClipboard(note.message)}
                            className="p-1 rounded hover:bg-slate-700/50 text-slate-500 hover:text-white"
                            title="Copy code"
                          >
                            <Copy className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
