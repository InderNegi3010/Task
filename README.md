🎯 Points Leaderboard App

A full-stack leaderboard application built with Vite + React + Tailwind CSS v4 (frontend) and Express + MongoDB + Socket.io (backend).
Users can claim random points, view their rankings in real time, and check their claim history.

🚀 Features

👥 User Management: Add new users with default points.

📊 Leaderboard: Ranks users dynamically based on total points.

🎁 Claim Points: Random points between 1–10 can be claimed.

🕒 Claim History: View user claim history with timestamps.

⚡ Real-time Updates: Leaderboard auto-updates using Socket.io.

🎨 Modern UI: Built with Vite + React + Tailwind v4.

🛠️ Tech Stack
Frontend

⚡ Vite

⚛️ React

🎨 Tailwind CSS v4

🔔 Socket.io-client

Backend

🟢 Node.js

🚂 Express.js

🍃 MongoDB + Mongoose

🔔 Socket.io

📂 Project Structure
project-root/
│── backend/
│   ├── models/
│   ├── controllers/
│   ├── routes/
│   ├── server.js
│   └── seed.js
│
│── frontend/
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── App.jsx
│   │   └── main.jsx
│   ├── index.html
│   └── package.json
│
│── README.md
