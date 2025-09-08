/* eslint-disable no-unused-vars */
import React, { useEffect } from "react";
import { Routes, Route, Navigate } from "react-router-dom";

import HomePage from "./pages/HomePage.jsx";
import SignUpPage from "./pages/SignUpPage.jsx";
import LoginPage from "./pages/LoginPage.jsx";
import SettingsPage from "./pages/SettingsPage.jsx";
import ProfilePage from "./pages/ProfilePage.jsx";
import NavBar from "./components/NavBar.jsx";
import { useAuthStore } from "./store/useAuthStore.js";
import { useThemeStore } from "./store/useThemeStore.js";

import { Loader } from "lucide-react";
import { Toaster } from "react-hot-toast";
const App = () => {
   const { authUser, checkAuth, isCheckingAuth, onlineUsers } = useAuthStore(); // commong utility
   const { theme } = useThemeStore();

   useEffect(() => {
      checkAuth();
   }, [checkAuth]);

   if (isCheckingAuth && !authUser) {
      return (
         <div className="flex items-center justify-center h-screen bg-gray-100">
            <Loader className="w-10 h-10 animate-spin text-blue-600" />
         </div>
      );
   }

   return (
      <div
         data-theme={theme}
         className="w-screen">
         <NavBar />

         <Routes>
            <Route
               path="/"
               element={authUser ? <HomePage /> : <Navigate to="/login" />}
            />
            <Route
               path="/signup"
               element={!authUser ? <SignUpPage /> : <Navigate to="/" />}
            />
            <Route
               path="/login"
               element={!authUser ? <LoginPage /> : <Navigate to="/" />}
            />
            <Route
               path="/settings"
               element={<SettingsPage />}
            />
            <Route
               path="/profile"
               element={authUser ? <ProfilePage /> : <Navigate to="/login" />}
            />
         </Routes>
         <Toaster />
      </div>
   );
};

export default App;
