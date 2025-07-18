import React, { useState, useEffect } from "react";
import axios from "axios";
import { toast ,Toaster} from "react-hot-toast";
import { EditorView, basicSetup } from "codemirror";
import { javascript } from "@codemirror/lang-javascript";
import { dracula } from "@uiw/codemirror-theme-dracula";

import { Code, Save, FileText, Zap, Terminal, Copy, Check, RefreshCw } from "lucide-react"; 

export default function Notes() {
 const [code, setCode] = useState("console.log('Hello World! 🚀');");
 const [notes, setNotes] = useState([]);
 const [loading, setLoading] = useState(false);
 const [copied, setCopied] = useState(false);
 const [fetchingNotes, setFetchingNotes] = useState(false);
 const [user, setUser] = useState({
   label: "",
   lang: "javascript",
 });

const handleChange = (e) => {
   setUser((prev) => ({
     ...prev,
     [e.target.name]: e.target.value,
   }));
 };

//new featers
 const copyToClipboard = () => {
   navigator.clipboard.writeText(code);
   setCopied(true);
   setTimeout(() => setCopied(false), 2000);
 };

//lang
const languageOptions = [
   { value: "javascript", label: "JavaScript", icon: "JS" },
   { value: "python", label: "Python", icon: "PY" },
   { value: "java", label: "Java", icon: "JA" },
   { value: "css", label: "CSS", icon: "CS" },
   { value: "html", label: "HTML", icon: "HT" },
   { value: "jsx", label: "JSX", icon: "JX" },
   { value: "cpp", label: "C++", icon: "C+" },
   { value: "csharp", label: "C#", icon: "C#" },
   { value: "rust", label: "Rust", icon: "RS" },
 ];

 const responsiveTheme = EditorView.theme({
         "&": {
           width: "100%",
           height: "400px",
           borderRadius: "0.80rem",
           overflow: "hidden",
         },
"@media (max-width: 640px)": {
     "&": {
       height: "300px",
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
   setFetchingNotes(true);

   try {
     const token = localStorage.getItem("token");
     const response = await axios.get(" http://localhost:3000/api/all", {
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
   setFetchingNotes(false);

   }
 };

 const handleAddNote = async () => {
   if (!code.trim()) return;
  
   if (!user.label || !user.lang) {
     toast.error("Please provide both label and language");
     return;
   }
  
   setLoading(true);
   try {
     const token = localStorage.getItem("token");
    await axios.post(
       " https://error-logger.onrender.com/api/add",
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
      toast.error("Error saving note");
     }
    finally {
     setLoading(false);
   }
 };


 return ( 

   <div className="min-h-screen rounded-2xl  md:p-4"> 
      <Toaster position="top-center" reverseOrder={false} />


<div className="max-w-6xl mx-auto">
       {/* Header */}
       <div className=" mb-8">
      

       {/* Main Editor Card */}
       <div className="   rounded-2xl border border-slate-700/50 shadow-2xl mb-8">
         {/* Editor Header */}
         <div className="flex flex-col lg:flex-row items-center justify-between p-6 border-b border-slate-700/50">
           <div className="flex items-center gap-3 mb-4 lg:mb-0">
             <div className="flex gap-2">
               <div className="w-5 h-5 bg-red-500 rounded-full shadow-lg"></div>
               <div className="w-5 h-5 bg-yellow-500 rounded-full shadow-lg"></div>
               <div className="w-5 h-5 bg-green-500 rounded-full shadow-lg"></div>
             </div>
             <span className="text-slate-400 text-sm font-medium ml-2">Code Editor</span>
           </div>
          
           <div className="flex  md:flex-row gap-3 w-full lg:w-auto">
             <div className="relative">
               <FileText className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-slate-400" />
              <input
                type="text"
                placeholder="Enter snippet label..."
                className="pl-10 pr-4 py-3 bg-gray-200 rounded-xl text-black placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 w-full sm:w-48"
                onChange={handleChange}
               value={user.label}
                name="label"
               />
             </div>
            
             <div className="relative">
               <Code className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-slate-400" />
              <select
                className="pl-10 pr-8 py-3 bg-gray-200 rounded-xl text-black focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 appearance-none w-full sm:w-40"
                onChange={handleChange}
                value={user.lang}
                 name="lang"
               >
                 {languageOptions.map((lang) => (
                  <option key={lang.value} value={lang.value}>
                   {lang.label}
                   </option>
                 ))}
               </select>
             </div>
           </div>
         </div>

         {/* Code Editor */}
         <div className="p-6">
           <div className="relative">
             <div
               id="editor"
               className="rounded-xl overflow-hidden border border-slate-700/50 shadow-inner  custom-scroll"
               style={{ minHeight: "400px" }}
             ></div>
            
             {/* Copy button */}
             <button
               onClick={copyToClipboard}
               className="absolute top-4 right-4 p-2 bg-slate-800/80 hover:bg-slate-700/80 rounded-lg transition-all duration-200 group backdrop-blur-sm"
             >
               {copied ? (
                <Check className="w-4 h-4 text-green-400" />
               ) : (
                <Copy className="w-4 h-4 text-slate-400 group-hover:text-white" />
               )}
             </button>
           </div>

           {/* Action Buttons */}
         <div className="flex flex-col sm:flex-row justify-between items-center mt-6 gap-4">
             <div className="flex items-center gap-4 text-slate-400">
               <div className="flex items-center gap-1">
                 <Zap className="w-4 h-4" />
                 <span className="text-sm">Lines: {code.split('\n').length}</span>
               </div>
              <div className="flex items-center gap-1">
                 <FileText className="w-4 h-4" />
                 <span className="text-sm">Chars: {code.length}</span>
               </div>
             </div>
           
             <div className="flex gap-3">
               <button
                 onClick={fetchNotes}
                 disabled={fetchingNotes}
                 className="flex items-center gap-2 bg-gray-300 text-black px-4 py-2 rounded-xl font-medium transition-all duration-200 disabled:opacity-50"
               >
                 <RefreshCw className={`w-4 h-4 ${fetchingNotes ? 'animate-spin' : ''}`} />
                 Refresh
               </button>
              
               <button
                 onClick={handleAddNote}
                 disabled={loading || !code.trim() || !user.label || !user.lang}
                 className="flex items-center gap-2 bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600 disabled:from-slate-600 disabled:to-slate-600 text-white px-6 py-3 rounded-xl font-medium transition-all duration-200 transform hover:scale-105 disabled:scale-100 disabled:cursor-not-allowed shadow-lg"
               >
                 {loading ? (
                   <>
                     <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                     Saving...
                   </>
                 ) : (
                   <>
                     <Save className="w-4 h-4" />
                     Save Snippet
                   </>
                 )}
               </button>
             </div>
           </div>
         </div>
       </div>

       {/* Saved Notes
       {notes.length > 0 && (
         <div className="bg-slate-800/40 backdrop-blur-xl rounded-2xl border border-slate-700/50 shadow-2xl">
           <div className="p-6 border-b border-slate-700/50">
             <div className="flex items-center justify-between">
               <h2 className="text-xl font-bold text-white flex items-center gap-2">
                 <FileText className="w-5 h-5" />
                 Saved Snippets ({notes.length})
               </h2>
               {fetchingNotes && (
                 <div className="flex items-center gap-2 text-slate-400">
                   <RefreshCw className="w-4 h-4 animate-spin" />
                   <span className="text-sm">Loading...</span>
                 </div>
               )}
             </div>
           </div>
          
           <div className="p-6">
             <div className="grid gap-4 max-h-96 overflow-y-auto">
               {notes.map((note) => (
                 <div
                   key={note._id}
                   className="bg-slate-900/60 rounded-xl border border-slate-700/50 p-4 hover:border-blue-500/50 transition-all duration-200 backdrop-blur-sm"
                 >
                   <div className="flex items-center justify-between mb-3">
                     <div className="flex items-center gap-2">
                       <span className="px-3 py-1 bg-blue-500/20 text-blue-300 rounded-lg text-sm font-medium">
                         {note.label}
                       </span>
                       <span className="px-3 py-1 bg-slate-700/50 text-slate-300 rounded-lg text-sm">
                         {languageOptions.find(lang => lang.value === note.lang)?.label || note.lang}
                       </span>
                     </div>
                     <span className="text-xs text-slate-400">
                       {new Date(note.timestamp).toLocaleString()}
                     </span>
                   </div>
                   <pre className="text-sm text-green-400 bg-slate-950/80 rounded-lg p-3 overflow-x-auto font-mono border border-slate-800/50">
                     {note.message}
                   </pre>
                 </div>
               ))}
             </div>
           </div>
         </div>
       )} */}
     </div>
   </div>
     </div>
 
 );
}