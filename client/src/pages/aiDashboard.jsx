import axios from "axios";
import { useEffect, useRef, useState } from "react";
import { toast, Toaster } from "react-hot-toast";
import { Sparkles } from "lucide-react";

export default function AiDashboard() {
  const [snippet, setSnippet] = useState("");
  const [analysisResult, setAnalysisResult] = useState("");
  const [analyzing, setAnalyzing] = useState(false);
  const[transition,settransition]=useState(false)
  const snippetRef = useRef(null);
  function handleTransition() {
    settransition(true);};

  const handleAnalyzeSnippet = async () => {
    if (!snippet.trim()) {
      toast.error("Please enter a message or code to analyze.");
      return;
    }
    setAnalyzing(true);
    setAnalysisResult("");
    try {
      const res = await axios.post(
        "https://error-logger.onrender.com/api/analyze-snippet",
        { code: snippet },
        { withCredentials: true }
      );
      setAnalysisResult(res.data.analysis);
      toast.success("Response ready!");
    } catch (err) {
      toast.error(err?.response?.data?.error || "Something went wrong.");
    } finally {
      setAnalyzing(false);
    }
  };



  return (
    <div className="min-h-screen flex flex-col items-center  px-4 py-12">
      <Toaster />
      <div className="max-w-3xl w-full">
        <h1
          className={`text-3xl sm:text-4xl font-semibold mb-6 text-center  transition-all duration-500 ${
            transition ? "opacity-0 scale-95" : "opacity-100 scale-100"
          }  `}
        >
          Hi there. What should we dive into today?
        </h1>

        <div
          className={`border backdrop-blur-2xl border-slate-200 rounded-xl shadow-lg p-6 transition-all duration-700 ease-in-out ${
            transition ? "mt-0" : "mt-16"
          }`}
        >
          {" "}
          <div className="flex items-center gap-2 mb-3">
            <Sparkles fill="yellow" className="text-yellow-400" size={20} />
            <span className="bg-gradient-to-r from-blue-600 via-green-500 to-indigo-400 inline-block text-transparent bg-clip-text font-medium">
              Message Logger
            </span>
          </div>
          <div
            className={` backdrop-blur-2xl  rounded-xl shadow-lg p-6 transition-all duration-700 ease-in-out ${
              transition ? "mt-0" : "mt-14"
            }`}
          >
            <textarea
              ref={snippetRef}
              className="w-full max-h-48 min-h-[100px] rounded-lg p-3 text-sm bg-[#0f172a] border border-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-cyan-700 resize-none overflow-y-auto custom-scroll"
              placeholder="Type or paste your message here..."
              value={snippet}
              onChange={(e) => {
                if (!transition) handleTransition();
                setSnippet(e.target.value);
              }}
            />

            <div className="mt-4 flex justify-end">
              <button
                onClick={handleAnalyzeSnippet}
                className="bg-gray-200 text-slate-700 hover:bg-gray-300 px-5 py-2 rounded-lg font-medium transition-all duration-500 disabled:opacity-60"
                disabled={analyzing}
              >
                {analyzing ? "Thinking..." : "Submit"}
              </button>
            </div>
          </div>
        </div>

        {analysisResult && (
          <div className="mt-6 bg-gray-900 border border-cyan-800 p-4 rounded-lg text-cyan-100">
            <Sparkles
              className="bg-gradient-to-b to-yellow-300 rounded-2xl"
              size={20}
            />
            <h3 className="bg-gradient-to-r from-yellow-600 via-green-500 to-indigo-400 inline-block text-transparent bg-clip-text font-semibold mb-2 gap-2">
              Logger Says:
            </h3>
            <div className="max-h-64 overflow-y-auto text-green-400 whitespace-pre-wrap pr-2 custom-scroll">
              {analysisResult}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
