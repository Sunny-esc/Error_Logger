import React, { useState, useEffect } from "react";
import axios from "axios";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { vscDarkPlus } from "react-syntax-highlighter/dist/esm/styles/prism";
import { toast } from "react-hot-toast";
import NoteModal from "./NoteModal";
import CodeViewModal from "./CodeViewModal"; // <-- add this
import { Eye, EyeOff } from "lucide-react";

export default function Notesaved() {
  const [notes, setNotes] = useState([]);
  const [loading, setLoading] = useState(false);
  const [viewCode, setViewCode] = useState({ open: false, message: "", lang: "" });

  const [openNoteId, setOpenNoteId] = useState(null);
  const [editNote, setEditNote] = useState(null);

  useEffect(() => {
    fetchNotes();
  }, []);

  const fetchNotes = async () => {
    setLoading(true);
    try {
      const token = localStorage.getItem("token");
      const response = await axios.get("https://error-logger.onrender.com/api/all", {
        headers: { Authorization: `Bearer ${token}` },
        withCredentials: true,
      });
      setNotes(Array.isArray(response.data) ? response.data : []);
    } catch (err) {
      toast.error("Error fetching notes");
    }
    setLoading(false);
  };

  const handleNoteClick = (note) => {
    setOpenNoteId(note._id);
    setEditNote({ ...note });
  };

  const handleSave = async () => {
    try {
      const token = localStorage.getItem("token");
      await axios.put(`https://error-logger.onrender.com/api/update/${editNote._id}`, editNote, {
        headers: { Authorization: `Bearer ${token}` },
      });
      toast.success("Note updated!");
      setEditNote(null);
      setOpenNoteId(null);
      fetchNotes();
    } catch (err) {
      toast.error("Update failed");
    }
  };

  const handleDelete = async () => {
    const confirmed = window.confirm("Are you sure you want to delete this note?");
    if (!confirmed) return;

    try {
      const token = localStorage.getItem("token");
      await axios.delete(`https://error-logger.onrender.com/api/delete/${editNote._id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      toast.success("Note deleted!");
      setEditNote(null);
      setOpenNoteId(null);
      fetchNotes();
    } catch (err) {
      toast.error("Delete failed");
    }
  };

  return (
      <div className="p-6 max-w-4xl mx-auto">
      {loading && (
        <div className="text-center text-blue-500 font-medium mb-4">
          Loading...
        </div>
      )}

      <h2 className="text-2xl font-bold mb-6 border-b pb-2 border-gray-300">
        Your Saved Code
      </h2>

      <ul className="space-y-4 md:p-6 min-h-150 md:max-h-126 overflow-y-auto custom-scroll">
        {notes.map((note) => (
          <li
            key={note._id}
            className="bg-white rounded-xl shadow-md p-4 border hover:border-blue-500 cursor-pointer"
            onClick={() => handleNoteClick(note)}
          >
            <div className="flex justify-between items-center mb-2">
              <h3 className="text-lg font-semibold">{note.label}</h3>
              <span className="text-xs bg-gray-800 text-white px-2 py-1 rounded">
                {note.lang}
              </span>
            </div>
            <div className="bg-[#1e1e1e] text-white text-sm rounded-md overflow-auto p-3 mb-2">
              <SyntaxHighlighter
                language={note.lang || "javascript"}
                style={vscDarkPlus}
                customStyle={{
                  background: "transparent",
                  margin: 0,
                  padding: 0,
                }}
              >
                {note.message.length > 100
                  ? note.message.slice(0, 100) + "..."
                  : note.message}
              </SyntaxHighlighter>
            </div>
            <p className="text-xs text-gray-500">
              Logged on: {new Date(note.timestamp).toLocaleString()}
            </p>

            <div className="flex justify-between">
              <button
                className="text-purple-900 flex gap-2 underline text-sm mt-2 ml-4"
                onClick={(e) => {
                  e.stopPropagation();
                  setViewCode({
                    open: true,
                    message: note.message,
                    lang: note.lang || "javascript",
                  });
                }}
              >
                {" "}
                <Eye size={18} />
                View Full Code
              </button>
              <p className="text-slate-500 text-sm underline">
                click on code to edit it
              </p>
            </div>
          </li>
        ))}
      </ul>
          <CodeViewModal
        open={viewCode.open}
        onClose={() => setViewCode({ open: false, message: "", lang: "" })}
        code={viewCode.message}
        language={viewCode.lang}
      />
      {/* Modal for editing */}
      <NoteModal
        open={Boolean(openNoteId)}
        onClose={() => {
          setOpenNoteId(null);
          setEditNote(null);
        }}
        note={editNote}
        setNote={setEditNote}
        onSave={handleSave}
        onDelete={handleDelete}
      />
    </div>
  );
}
