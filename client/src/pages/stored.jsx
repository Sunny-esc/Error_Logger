import React, { useState, useEffect } from "react";
import axios from "axios";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { vscDarkPlus } from "react-syntax-highlighter/dist/esm/styles/prism";
import { toast } from "react-hot-toast";

export default function Notesaved() {
  const [notes, setNotes] = useState([]);
  const [loading, setLoading] = useState(false);
  const [openNoteId, setOpenNoteId] = useState(null);

  const [editNoteId, setEditNoteId] = useState(null);
  const [editNote, setEditNote] = useState({ message: "", label: "", lang: "" });

  // Fetch notes on mount
  useEffect(() => {
    fetchNotes();
  }, []);

  const fetchNotes = async () => {
    setLoading(true);
    try {
      const token = localStorage.getItem("token");
      const response = await axios.get("http://localhost:3000/api/all", {
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

  return (
    <div className="p-6 max-w-4xl mx-auto">
      {loading && (
        <div className="text-center text-blue-500 font-medium mb-4">Loading...</div>
      )}

      <h2 className="text-2xl font-bold mb-6 border-b pb-2 border-gray-300">
        Your Saved Notes
      </h2>

      <ul className="space-y-4">
        {notes.map((note) => (
          <li
            key={note._id}
            className={`bg-white rounded-xl shadow-md transition-all duration-300 hover:shadow-lg p-4 border ${
              openNoteId === note._id ? "border-blue-500" : "border-transparent"
            }`}
            onClick={() => handleNoteClick(note._id)}
          >
            <div className="flex justify-between items-center mb-3">
              <h3 className="text-lg font-semibold text-gray-800 capitalize">
                {note.label}
              </h3>
              <span className="text-sm text-white bg-gray-800 px-2 py-1 rounded">
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
                {openNoteId === note._id
                  ? note.message
                  : note.message.length > 100
                  ? note.message.slice(0, 100) + "..."
                  : note.message}
              </SyntaxHighlighter>
            </div>

            <p className="text-xs text-gray-500 mb-2">
              Logged on: {new Date(note.timestamp).toLocaleString()}
            </p>

            <button
              className="text-blue-500 underline text-sm mt-2"
              onClick={(e) => {
                e.stopPropagation();
                setEditNoteId(note._id);
                setEditNote({
                  message: note.message,
                  label: note.label,
                  lang: note.lang,
                });
                setOpenNoteId(note._id); // Ensure it's expanded
              }}
            >
              Edit Note
            </button>
            <button
  className="text-red-500 underline text-sm mt-2 ml-4"
  onClick={async (e) => {
    e.stopPropagation();
    const confirmed = window.confirm("Are you sure you want to delete this note?");
    if (!confirmed) return;

    const token = localStorage.getItem("token");
    try {
      await axios.delete(`http://localhost:3000/api/delete/${note._id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      toast.success("Note deleted!");
      fetchNotes(); // Refresh the list
    } catch (err) {
      toast.error("Delete failed");
    }
  }}
>
  Delete Note
</button>


            {editNoteId === note._id && (
              <div className="mt-4 space-y-3">
                <input
                  value={editNote.label}
                  onChange={(e) =>
                    setEditNote({ ...editNote, label: e.target.value })
                  }
                  placeholder="Label"
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
                />
                <input
                  value={editNote.lang}
                  onChange={(e) =>
                    setEditNote({ ...editNote, lang: e.target.value })
                  }
                  placeholder="Language"
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
                />
                <textarea
                  value={editNote.message}
                  onChange={(e) =>
                    setEditNote({ ...editNote, message: e.target.value })
                  }
                  placeholder="Message"
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
                  rows={6}
                />
                <div className="flex gap-2">
                  <button
                    onClick={async () => {
                      const token = localStorage.getItem("token");
                      try {
                        await axios.put(
                          `http://localhost:3000/api/update/${note._id}`,
                          editNote,
                          {
                            headers: {
                              Authorization: `Bearer ${token}`,
                            },
                          }
                        );
                        toast.success("Note updated!");
                        setEditNoteId(null);
                        fetchNotes();
                      } catch (err) {
                        toast.error("Update failed");
                      }
                    }}
                    className="bg-green-600 text-white px-4 py-1 rounded hover:bg-green-700"
                  >
                    Save
                  </button>
                  <button
                    onClick={() => setEditNoteId(null)}
                    className="bg-gray-300 px-4 py-1 rounded hover:bg-gray-400"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}
