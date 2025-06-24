import React from 'react';
import Header from '../assets/header';
import Footer from '../assets/footer';
import projectImg from '../assets/img/x1.jpg'; // You can use a dashboard screenshot here
import {Link} from 'react-router-dom'
export default function Project() {
  return (
    <>
      <Header />
      <div className="py-16 mt-20 ">
        <div className="container mx-auto px-6 lg:px-12">

          {/* Hero Section */}
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold mb-4">🛠️ Error Logger Project</h1>
            <p className="text-lg text-gray-600">
              A full-stack MERN application to help developers securely log, track, and manage coding errors.
            </p>
          </div>

          {/* Image & Description */}
          <div className="flex flex-col lg:flex-row gap-10 items-center">
            <div className="w-full lg:w-1/2">
              <img src={projectImg} alt="Project Screenshot" className="rounded-xl shadow-md" />
            </div>
            <div className="w-full lg:w-1/2 space-y-6">
              <h2 className="text-2xl font-semibold">💡 Project Purpose</h2>
              <p>
                Developers often face bugs and errors that are hard to track or remember. Error Logger offers a personal space
                where users can document their issues, attach code, and review them later — a digital debugging notebook.
              </p>

              <h2 className="text-2xl font-semibold mt-6">🚀 Features</h2>
              <ul className="list-disc list-inside space-y-2">
                <li>User authentication with JWT</li>
                <li>Email verification via Nodemailer</li>
                <li>CodeMirror-powered code editor</li>
                <li>Personalized error note-taking</li>
                <li>Timestamp-based organization</li>
                <li>Clean UI with responsive design</li>
              </ul>

              <h2 className="text-2xl font-semibold mt-6">🧰 Tech Stack</h2>
              <div className="flex flex-wrap gap-4">
                <span className="bg-gray-200 px-3 py-1 rounded-full text-black text-sm">React</span>
                <span className="bg-gray-200 px-3 py-1 rounded-full text-black text-sm">Express</span>
                <span className="bg-gray-200 px-3 py-1 rounded-full text-black text-sm">MongoDB</span>
                <span className="bg-gray-200 px-3 py-1 rounded-full text-black text-sm">Node.js</span>
                <span className="bg-gray-200 px-3 py-1 rounded-full text-black text-sm">CodeMirror</span>
                <span className="bg-gray-200 px-3 py-1 rounded-full text-black text-sm">Tailwind CSS</span>
              </div>

              <div className="mt-6">
                <Link
                to="/notfound"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-black text-white px-5 py-2 rounded-xl hover:bg-gray-800"
                >
                  🔗 View GitHub Repo
                </Link>
              </div>
            </div>
          </div>

        </div>
      </div>
      <Footer />
    </>
  );
}
