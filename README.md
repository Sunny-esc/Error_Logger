# 🐞 Error Logger

> **Transform Errors Into Action, Instantly and Securely**

![Last Commit](https://img.shields.io/github/last-commit/Sunny-esc/Error_Logger?style=for-the-badge)
![Tech](https://img.shields.io/badge/javascript-98.8%25-yellow?style=for-the-badge&logo=javascript)
![Hosted on Render](https://img.shields.io/badge/Hosted%20on-Render-3C3C3C?style=for-the-badge&logo=render&logoColor=white)

---

## ✨ Features

- 🐛 Log and save custom errors or code snippets with timestamp and language
- 🔐 Secure login and signup system with JWT authentication
- 📧 Email verification for new users (Nodemailer + JWT)
- 🏠 Personalized dashboard with live stats, charts, and recent activity
- 📝 Code editor with syntax highlighting (CodeMirror)
- 📂 Filter, search, copy, edit, and delete your snippets
- 👤 User profile management and saved notes
- 🌐 Admin & User Dashboard
- 📊 Analytics: language distribution, recent activity, quick stats
- ⚙️ Built with the MERN stack (MongoDB, Express, React, Node.js)
- 💽 MongoDB + Express backend
- 🎨 Modern dark theme, responsive design, and smooth UX

---

## 🧪 Tech Stack

![Languages](https://img.shields.io/github/languages/count/Sunny-esc/Error_Logger?style=for-the-badge)

---

## 🔧 Built with the tools and technologies:

<p align="center">
  <img src="https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript" />
  <img src="https://img.shields.io/badge/JSON-000000?style=for-the-badge&logo=json" />
  <img src="https://img.shields.io/badge/Markdown-000000?style=for-the-badge&logo=markdown" />
  <img src="https://img.shields.io/badge/CodeMirror-DB1F26?style=for-the-badge&logo=codemirror" />
  <img src="https://img.shields.io/badge/NPM-CB3837?style=for-the-badge&logo=npm" />
  <img src="https://img.shields.io/badge/Mongoose-880000?style=for-the-badge&logo=mongoose" />
  <img src="https://img.shields.io/badge/.ENV-8DD6F9?style=for-the-badge" />
  <br />
  <img src="https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=nodedotjs" />
  <img src="https://img.shields.io/badge/Nodemon-76D04B?style=for-the-badge&logo=nodemon" />
  <img src="https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react" />
  <img src="https://img.shields.io/badge/Vite-646CFF?style=for-the-badge&logo=vite" />
  <img src="https://img.shields.io/badge/ESLint-4B32C3?style=for-the-badge&logo=eslint" />
  <img src="https://img.shields.io/badge/Axios-5A29E4?style=for-the-badge&logo=axios" />
  <img src="https://img.shields.io/badge/React Router-CA4245?style=for-the-badge&logo=reactrouter" />
</p>


- **Frontend:** React, Tailwind CSS, CodeMirror, Material UI, Lucide React Icons, Axios, Framer Motion, GSAP
- **Backend:** Express, MongoDB, JWT, Bcrypt, Nodemailer, Passport (Google OAuth)
- **Security:** Helmet, express-mongo-sanitize, express-rate-limit, csurf
- **Notifications:** react-hot-toast

---

## 📦 Setup Instructions

```bash
# Clone the repo
git clone https://github.com/yourusername/error-logger.git

# Install backend dependencies
cd server
npm install

# Start backend
npm run dev

# In a separate terminal, install frontend
cd ../client
npm install

# Start frontend
npm run dev
```

---

## 🗂️ Project Structure

```
error-logger/
├── server/
│   ├── src/
│   │   ├── controller/
│   │   ├── db/
│   │   ├── middleware/
│   │   ├── models/
│   │   ├── routes/
│   │   └── utils/
│   └── package.json
├── client/
│   ├── src/
│   │   ├── api/
│   │   ├── assets/
│   │   ├── comp/
│   │   ├── login/
│   │   ├── pages/
│   │   └── App.css, main.jsx, etc.
│   └── package.json
└── README.md
```

---

## 🔗 API Endpoints

- **Register:** `/api/auth/register`
- **Verify:** `/api/auth/verify/:token`
- **Login:** `/api/auth/login`
- **Add Error/Snippet:** `POST /api/add`
- **Get All Errors/Snippets:** `GET /api/all`
- **Get Profile:** `GET /api/auth/profile`
- **Other endpoints** for updating, deleting, and sharing snippets as implemented

---

## 🚀 Live Demo

[https://error-logger-rust.vercel.app/](https://error-logger-rust.vercel.app/)

---

## 👤 Author

Hi, I'm Sunny!  
Feel free to reach out or contribute.

---

## 📌 Notes & Tips

- Verify your email before logging in for the first time
- All snippets are private to your account unless shared
- Use filters and search to quickly find your code
- Expand the app with tags, export, or sharing features as needed

---

**Let me know if you want this update applied, or if you want a separate README for the client folder as well!**
