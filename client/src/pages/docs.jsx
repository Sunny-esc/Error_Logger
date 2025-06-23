import React from "react";
import Header from '../assets/header';


export default function Docs() {
  return (
    <>
    <Header/>
    <div className="max-w-4xl mx-auto px-6 py-10 mt-20">
      <h1 className="text-3xl font-bold mb-6">📘 Error Logger - Documentation</h1>

      <section className="mb-8">
        <h2 className="text-xl font-semibold mb-2">🔐 User Authentication</h2>
        <p className="text-gray-500 mb-2">
          Users must register and verify their email before logging in. This is done through a secure email link using JWT tokens and Nodemailer.
        </p>
        <ul className="list-disc list-inside ">
          <li>Register: `/api/auth/register`</li>
          <li>Verify: `/verify/:token`</li>
          <li>Login: `/api/auth/login`</li>
        </ul>
      </section>

      <section className="mb-8">
        <h2 className="text-xl font-semibold mb-2">📝 Logging Errors</h2>
        <p className=" mb-2">
          After login, users can log errors using a rich editor. Each error is timestamped and saved securely in the database.
        </p>
        <ul className="list-disc list-inside ">
          <li>Add Error: `POST /api/add`</li>
          <li>Get Errors: `GET /api/all`</li>
        </ul>
      </section>

      <section className="mb-8">
        <h2 className="text-xl font-semibold mb-2">🧪 Tech Stack</h2>
        <ul className="list-disc list-inside ">
          <li>Frontend: React, Tailwind CSS, CodeMirror</li>
          <li>Backend: Express, MongoDB, JWT, Bcrypt</li>
          <li>Email Verification: Nodemailer + JWT</li>
        </ul>
      </section>

      <section>
        <h2 className="text-xl font-semibold mb-2">📌 Notes</h2>
        <ul className="list-disc list-inside ">
          <li>Users must verify their email before logging in.</li>
          <li>Each error is saved per user — no global access.</li>
          <li>You can expand this with tags, filters, or export options.</li>
        </ul>
      </section>
    </div>
    </>
  );
}
