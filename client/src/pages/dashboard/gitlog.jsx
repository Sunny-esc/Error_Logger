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
    <div className="p-4 rounded-xl bg-white shadow-md">
      <h2 className="font-semibold text-lg mb-2">Recent Activity</h2>
      
      {/* Existing Activities */}
      

      {/* Git Commits */}
      <h3 className="font-medium mt-4">Recent Git Commits</h3>
      <ul className="text-sm text-gray-700 mt-2 space-y-1">
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
