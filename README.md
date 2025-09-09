# 💬 ChatterBox - MERN Chat Application

ChatterBox is a fullstack **`MERN` (MongoDB, Express, React, Node.js)** real-time chat application with authentication, profile management, theme customization, and online/offline status tracking.  
It allows users to chat instantly with friends, manage their profiles, and personalize their experience with multiple color themes.

---

## 🚀 Features

-  **Authentication**

   -  Sign up, login, and logout functionality
   -  JWT-based authentication
   -  Secure password hashing with `bcryptjs`

-  **Profile**

   -  Update profile picture (Cloudinary integration)
   -  Manage account info

-  **Chat**

   -  Real-time messaging using **Socket.IO**
   -  Online/offline user status
   -  Sidebar with user list

-  **UI/UX**
   -  Responsive modern UI built with `React` + `TailwindCSS` + `DaisyUI`
   -  Settings page with multiple theme filters
   -  Toast notifications with `react-hot-toast`

---

## 🛠️ Tech Stack

### Frontend

-  React 18
-  Vite
-  TailwindCSS + DaisyUI
-  Zustand (state management)
-  React Router DOM
-  Socket.IO Client
-  Axios

### Backend

-  Node.js + Express
-  MongoDB + Mongoose
-  Socket.IO
-  JWT (Authentication)
-  Cloudinary (image upload)
-  dotenv, cors, cookie-parser

---

## 📂 Project Structure

```
/chat-app
   ├── /backend
   │     ├── src
   │     │     └── index.js
   │     ├── package.json
   │     └── ...
   ├── /frontend
   │     ├── src
   │     ├── package.json
   │     └── ...
   └── README.md
```

---

## ⚙️ Installation & Setup

### 1️⃣ Clone the repository

```bash
git clone https://github.com/chandan9369/mern-chat-app.git
cd mern-chat-app
```

### 2️⃣ Setup

```bash
cd backend
```

Create a `.env` file in `/backend` with:

```env
PORT=<port_number>
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_secret_key
CLOUDINARY_CLOUD_NAME=your_cloudinary_name
CLOUDINARY_API_KEY=your_cloudinary_api_key
CLOUDINARY_API_SECRET=your_cloudinary_api_secret
```

### 3️⃣ Build & Start

```bash
# Install frontend + backend dependencies and build frontend
npm run build

# Start backend server
npm start

```

---

## 📸 Screenshots

### Signup Page

![Signup Page](/app_assets/sign-up.png)

### 🔑 Login Page

![Login Page](/app_assets/login.png)

### 👤 Profile Page

![Profile Page](/app_assets/profile.png)

### 💬 Chat/Home Page

![Chat Page](/app_assets/home.png)

### ⚙️ Settings Page

![Settings Page](/app_assets/setting.png)

---

## 🙌 Acknowledgements

-  [React](https://reactjs.org/)
-  [Express](https://expressjs.com/)
-  [MongoDB](https://www.mongodb.com/)
-  [Socket.IO](https://socket.io/)
-  [Cloudinary](https://cloudinary.com/)
