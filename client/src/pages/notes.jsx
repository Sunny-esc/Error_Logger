import React, { useState, useEffect,useRef } from "react";
import axios from "axios";
import { toast ,Toaster} from "react-hot-toast";
import { EditorView, basicSetup } from "codemirror";
import { javascript } from "@codemirror/lang-javascript";
import { python } from "@codemirror/lang-python"; // Import Python language extension
import { java } from "@codemirror/lang-java";     // Import Java language extension (if available, or a generic one)
import { rust } from "@codemirror/lang-rust";  
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
      lang: "JavaScript",
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

  const getLanguageEx=(lang)=>{
    switch(lang){
   case "javascript":
        return javascript({ jsx: true });
      case "python":
        return python();
      case "java":
        // You might need to install @codemirror/lang-java if you haven't
        // If not available or you don't need highlighting for it,
        // you can return a basic language setup or null
        return java();
   
      case "rust":
        // You might need to install @codemirror/lang-rust
        return rust();
      default:
        return javascript({ jsx: true }); // Default to JS if language not found
    }
    
  }
   useEffect(() => {
    const editorParent = document.getElementById("editor");
    if (editorParent) {
      // Clear existing editor if any to prevent multiple instances
      if (editorRef.current) {
        editorRef.current.destroy();
      }

      const view = new EditorView({
        doc: code,
        lineWrapping: true,
        extensions: [
          responsiveTheme,
          basicSetup,
          getLanguageExtension(user.lang), // Use the selected language extension
          dracula,
          EditorView.updateListener.of((update) => {
            if (update.docChanged) {
              const newCode = update.state.doc.toString();
              setCode(newCode);
              // You had a setTimeout here for localStorage, keeping it for reference
              // clearTimeout(timeout);
              // timeout = setTimeout(() => {
              //   localStorage.setItem("notes-code", newCode);
              // }, 300);
            }
          }),
        ],
        parent: editorParent,
      });

      editorRef.current = view; // Store the EditorView instance

      return () => {
        if (editorRef.current) {
          editorRef.current.destroy();
          editorRef.current = null;
        }
      };
    }
  }, [user.lang, code]); // Re-run effect when `user.lang` or `code` changes

  // Update CodeMirror doc when external 'code' state changes
  useEffect(() => {
    if (editorRef.current && editorRef.current.state.doc.toString() !== code) {
      editorRef.current.dispatch({
        changes: { from: 0, to: editorRef.current.state.doc.length, insert: code },
      });
    }
  }, [code]);
  

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
      toast.error("Please provide both label and language");
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
                value={user.lang}
                name="lang"
                required
              >
                <option value="javascript">JavaScript</option>
                <option value="python">Python</option>
                <option value="java">Java</option>
                <option value="csharp">C#</option>
                <option value="rust">Rust</option>
                {/* Add more languages as needed */}
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
