import React, { useState, useEffect } from "react";
import axios from "axios";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { vscDarkPlus } from "react-syntax-highlighter/dist/esm/styles/prism";
import { toast } from "react-hot-toast";
import pro from './dashboard/pro.svg'
import saved from './dashboard/saved.svg'

export default function Sidecontent() {
  const [notes, setNotes] = useState([]);
  const [loading, setLoading] = useState(false);
  const [openNoteId, setOpenNoteId] = useState(null);
  

  // Fetch notes on mount
  useEffect(() => {
    fetchNotes();
  }, []);

  const fetchNotes = async () => {
    setLoading(true);
    try {
      const token = localStorage.getItem("token");
      const response = await axios.get("https://error-logger.onrender.com/api/all", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        withCredentials: true,
      });
      setNotes(Array.isArray(response.data) ? response.data : []);
    } catch (err) {
      toast.error("Error fetching notes");
    }
    setLoading(false);
  };

  const handleNoteClick = (noteId) => {
    if (editNoteId !== noteId) {
      setOpenNoteId(openNoteId === noteId ? null : noteId);
    }
  };

// Set how many notes to show
const NOTES_TO_SHOW = 2; // Change this number as needed

return (
    <div className="p-1 max-w-4xl mx-auto">
        {loading && (
            <div className="text-center text-blue-500 font-medium mb-4">
                Loading...
            </div>
        )}

        <ul className="space-y-6">
            {notes.slice(0, NOTES_TO_SHOW).map((note) => (
                <li
                    key={note._id}
                    className={`  rounded-xl shadow-md transition-all duration-300 hover:shadow-lg p-4 border ${
                        openNoteId === note._id ? "border-blue-500" : "border-transparent"
                    }`}
                    onClick={() => handleNoteClick(note._id)}
                >
                    <div className="flex justify-between items-center mb-3">
                        <h3 className="text-lg font-semibold  capitalize flex gap-1">
                            <img src={saved} alt=""  className="w-9"/>
                            {note.label}
                        </h3>
                        <span className="font-medium  flex px-2 py-1 rounded gap-1"  >
                            <img src={pro} alt="" className="w-9" />
                            {note.lang}
                        </span>
                    </div>

                    <p className="text-xs  mb-2">
                        saved on: {new Date(note.timestamp).toLocaleString()}
                    </p>
                </li>
            ))}
        </ul>
    </div>
);
}
