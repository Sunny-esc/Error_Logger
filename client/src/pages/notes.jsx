import React, { useState, useEffect } from "react";
import axios from "axios";
import { toast ,Toaster} from "react-hot-toast";
import { EditorView, basicSetup } from "codemirror";
import { javascript } from "@codemirror/lang-javascript";
import { dracula } from "@uiw/codemirror-theme-dracula";
import react1 from "../assets/svgs/logo/react1.svg";
import circle from "../assets/svgs/circle.svg";
import circle2 from "../assets/svgs/circle2.svg";
import circle3 from "../assets/svgs/circle3.svg";

export default function Notes() {
  const [code, setCode] = useState("console.log('hello');");
  const [notes, setNotes] = useState([]);
  const [loading, setLoading] = useState(false);


   const [user, setUser] = useState({
      label: "",
      lang: "",
    });

  
    const handleChange = (e) => {
      setUser((prev) => ({
        ...prev,
        [e.target.name]: e.target.value,
      }));
    };
  const responsiveTheme = EditorView.theme({
    "&": {
      width: "800px",
      maxWidth: "100%",
      height: "400px",
      borderRadius: "0.90rem",
      overflow: "hidden",
      scrollbarcolor: "black transparent",
    },
    "@media (max-width: 640px)": {
      "&": {
        width: "80vw",
        height: "250px",
        fontSize: "0.95rem",
      },
    },
  });

  useEffect(() => {
    const editorParent = document.getElementById("editor");
    if (editorParent && editorParent.children.length === 0) {
      const view = new EditorView({
        doc: code,
        lineWrapping: true,
        extensions: [
          responsiveTheme,
          basicSetup,
          javascript({ jsx: true }),
          dracula,
          EditorView.updateListener.of((update) => {
            if (update.docChanged) {
              const newCode = update.state.doc.toString();
              setCode(newCode);
           //   localStorage.setItem("notes-code", newCode);
            }
            let timeout;
EditorView.updateListener.of((update) => {
  if (update.docChanged) {
    clearTimeout(timeout);
    timeout = setTimeout(() => {
      const newCode = update.state.doc.toString();
      setCode(newCode);
    }, 300);
  }
})

          }),
        ],
        parent: editorParent,
      });

      return () => view.destroy();
    }
  }, []);
  

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
      toast.success("Notes fetched successfully!");
      setNotes(Array.isArray(response.data) ? response.data : []);
    } catch (err) {
      toast.error("Error fetching notes");
    } finally {
      setLoading(false);
    }
  };

  const handleAddNote = async () => {
    if (!code.trim()) return;
    setLoading(true);
    try {
      const token = localStorage.getItem("token");
      await axios.post(
        "https://error-logger.onrender.com/api/add",
        { message: code,
           label: user.label,
          lang: user.lang,
         },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
          withCredentials: true,
        }
      );
      toast.success("Note saved!");
      fetchNotes();
    } catch (err) {
      if(user.label===''||user.lang==='' ){
        toast.error("pls input label and lang")
      }else{
        toast.error("Error saving note");

      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="md:px-6 w-full ">
      <Toaster position="top-center" reverseOrder={false} />
      <div className="flex justify-between items-center">
      <h1 className="text-xl md:text-2xl font-bold mb-2">Logs</h1>
      <p className="text-base md:text-lg font-bold mb-4">This is the Log comp.</p>
      
      </div>
      <div className="mb-4">
        <div className="bg-gray-700 w-full rounded-xl shadow-md mb-4 p-2">
          <div className="flex justify-between">
         <div className="flex items-center justify-end gap-2 p-2">
            <img src={circle} alt="" className="w-7" />
            <img src={circle2} alt="" className="w-6" />
            <img src={circle3} alt="" className="w-6" />
          </div>
          <div  className="space-x-4 flex ">
          <input
            type="text"
            placeholder="Give Label..."
            className=" p-1 rounded bg-slate-600 w-30  md:w-50 text-white"
            onChange={handleChange}
            required
            value={user.label}
            name="label"
          />
          <select
                className="p-1 rounded bg-slate-600 w-30 md:w-50 text-white"
                onChange={handleChange}
                value={user.lang} // Controlled component: value tied to user.lang state
                name="lang" // Important for handleChange to update user.lang
                required
              >
                <option value="javascript">JavaScript</option>
                <option value="python">Python</option>
                <option value="java">Java</option>
                <option value="csharp">C#</option>
                <option value="rust">Rust</option>
                {/* Add more options here as desired */}
              </select>
          </div>
          </div>
          
          <div
            id="editor"
            className="rounded-xl overflow-hidden p-2 md:p-3"
            style={{ minHeight: "250px" }}
          ></div>
          <button
            onClick={handleAddNote}
            disabled={loading}
            className="bg-white text-black rounded-xl p-1 m-1 w-16 transition-all ease-in-out duration-300 hover:scale-105"
          >
            {loading ? "Saving..." : "Save"}
          </button>
        </div>
      </div>
     
      {/* Display saved notes the sec is temporary 
      <div className="mt-6">
        <h2 className="text-lg font-semibold mb-2">Saved Notes:</h2>
        <ul className="space-y-2 h-54 overflow-auto">
          {notes.map((note) => (
            <li
              key={note._id}
              className=" p-2 rounded-md shadow-sm text-sm overflow-hidden h-20"
            >
              <p className="break-words whitespace-pre-wrap">{note.message}</p>
              <p className="text-xs text-gray-500 mt-1">
                {new Date(note.timestamp).toLocaleString()}
              </p>
            </li>
          ))}
        </ul>
      </div>*/}
    </div>
  );
}
