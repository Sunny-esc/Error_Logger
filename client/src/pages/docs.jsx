import React from "react";
import Header from '../assets/header';
import Footer from "../assets/footer";

export default function Docs() {
  return (
    <>
      <Header />
      <div className="max-w-4xl mx-auto px-6 py-10 mt-20">
        <h1 className="text-3xl font-bold mb-6">📘 Error Logger - Documentation</h1>

        <section className="mb-8">
          <h2 className="text-xl font-semibold mb-2">🏠 Dashboard Overview</h2>
          <p className="text-gray-500 mb-2">
            The dashboard is your main hub, providing a summary of your coding activity, error logs, and quick access to all features. It includes:
          </p>
          <ul className="list-disc list-inside ">
            <li>Personalized greeting and live clock</li>
            <li>Statistics cards: total snippets, total views, languages, today's snippets</li>
            <li>Charts: language distribution, recent activity</li>
            <li>Snippets list: shows label, language, and date for each entry</li>
            <li>Sidebar: quick navigation and overview</li>
          </ul>
        </section>

        <section className="mb-8">
          <h2 className="text-xl font-semibold mb-2">🧭 Sidebar & Navigation</h2>
          <p className="mb-2">
            The sidebar provides quick access to all main sections:
          </p>
          <ul className="list-disc list-inside ">
            <li><b>Dashboard</b>: Main overview and stats</li>
            <li><b>Code Editor</b>: Write and edit code snippets</li>
            <li><b>My Snippets</b>: View all your saved code snippets</li>
            <li><b>Favorites</b>: Access your starred snippets</li>
            <li><b>Shared</b>: View snippets shared with you</li>
            <li><b>Settings</b>: Manage your account and preferences</li>
          </ul>
          <p className="mt-2">The sidebar is styled to match the dashboard's dark theme and includes quick stats and recent activity.</p>
        </section>

        <section className="mb-8">
          <h2 className="text-xl font-semibold mb-2">📝 Notes & Snippets</h2>
          <ul className="list-disc list-inside ">
            <li>Log new errors or code snippets with language and label</li>
            <li>Filter snippets by language, date, or search term</li>
            <li>Copy, edit, or delete snippets directly from the dashboard</li>
            <li>Each snippet shows its label, language (with color), and creation date</li>
            <li>Recent activity and language distribution are visualized for quick insights</li>
          </ul>
        </section>

        <section className="mb-8">
          <h2 className="text-xl font-semibold mb-2">👤 Profile & Saved Notes</h2>
          <ul className="list-disc list-inside ">
            <li>View and edit your profile information</li>
            <li>Access your saved notes and manage them</li>
            <li>Switch between dashboard, notes, saved, and profile tabs using the sidebar</li>
          </ul>
        </section>

        <section className="mb-8">
          <h2 className="text-xl font-semibold mb-2">🔄 Recent Activity & Analytics</h2>
          <ul className="list-disc list-inside ">
            <li>Recent activity panel shows your latest snippets and actions</li>
            <li>Language distribution chart visualizes your coding habits</li>
            <li>Quick stats in the sidebar for performance, users, and uptime</li>
          </ul>
        </section>

        <section className="mb-8">
          <h2 className="text-xl font-semibold mb-2">🧪 Tech Stack</h2>
          <ul className="list-disc list-inside ">
            <li>Frontend: React, Tailwind CSS, CodeMirror, Material UI (Skeleton), Lucide React Icons</li>
            <li>Backend: Express, MongoDB, JWT, Bcrypt</li>
            <li>Email Verification: Nodemailer + JWT</li>
            <li>API Requests: Axios</li>
            <li>Notifications: react-hot-toast</li>
          </ul>
        </section>

        <section className="mb-8">
          <h2 className="text-xl font-semibold mb-2">🔗 API Endpoints</h2>
          <ul className="list-disc list-inside ">
            <li>Register: <code>/api/auth/register</code></li>
            <li>Verify: <code>/verify/:token</code></li>
            <li>Login: <code>/api/auth/login</code></li>
            <li>Add Error/Snippet: <code>POST /api/add</code></li>
            <li>Get All Errors/Snippets: <code>GET /api/all</code></li>
            <li>Get Profile: <code>GET /api/auth/profile</code></li>
            <li>Other endpoints for updating, deleting, and sharing snippets as implemented</li>
          </ul>
        </section>

        <section className="mb-8">
          <h2 className="text-xl font-semibold mb-2">💡 UI/UX Features</h2>
          <ul className="list-disc list-inside ">
            <li>Modern dark theme with gradient backgrounds</li>
            <li>Responsive design for desktop and mobile</li>
            <li>Skeleton loading for smooth data fetch experience</li>
            <li>Interactive icons and hover effects</li>
            <li>Live clock and personalized greetings</li>
            <li>Quick actions: copy, edit, delete snippets</li>
          </ul>
        </section>

        <section>
          <h2 className="text-xl font-semibold mb-2">📌 Notes & Tips</h2>
          <ul className="list-disc list-inside ">
            <li>Verify your email before logging in for the first time</li>
            <li>All snippets are private to your account unless shared</li>
            <li>Use filters and search to quickly find your code</li>
            <li>Expand the app with tags, export, or sharing features as needed</li>
          </ul>
        </section>
      </div>
      <Footer />
    </>
  );
}
