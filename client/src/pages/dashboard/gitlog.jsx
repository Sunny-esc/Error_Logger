import React, { useEffect, useState } from 'react';
import axios from 'axios';

const RecentActivity = () => {
  const [commits, setCommits] = useState([]);

  useEffect(() => {
    axios.get("https://error-logger.onrender.com/api/auth/commits",)
      .then(res => setCommits(res.data))
      
      .catch(err => console.error(err));
  }, []);

  return (
    <div className="p-2 rounded-xl cursor-none bg-white text-gray-900 shadow-md w-[15rem]">      
      {/* Existing Activities */}
      

      {/* Git Commits */}
      <h3 className="font-medium text-gray-800">Recent Git Commits</h3>
      <ul className="text-sm text-gray-600 mt-2 space-y-1">
        {commits.map((commit, index) => (
          
          <li key={index}>
            <strong>{commit.message}</strong> — {commit.author} ({new Date(commit.date).toLocaleString()})
          </li>
          
        
          
        ))}
      </ul>
    </div>
  );
};

export default RecentActivity;
