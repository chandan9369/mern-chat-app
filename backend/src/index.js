import express from "express";
import "dotenv/config.js";
import cookieParser from "cookie-parser";
import authRoutes from "./routes/auth.route.js";
import messageRoutes from "./routes/message.route.js";

import path from "path";

import { connectDB } from "./lib/db.js";
import cors from "cors";
import { app, server } from "./lib/socket.js";

const PORT = process.env.PORT || 5000;

const __dirname = path.resolve();

// ✅ Middleware (must come before routes)
app.use(express.json({ limit: "10mb" })); // increase payload size
app.use(express.urlencoded({ limit: "10mb", extended: true }));
app.use(cookieParser());
app.use(
   cors({
      origin: "http://localhost:5173", // your frontend
      credentials: true, // allow cookies
      methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
      allowedHeaders: ["Content-Type", "Authorization"],
   })
);

// ✅ Routes
app.use("/api/auth", authRoutes);
app.use("/api/messages", messageRoutes);

// Default route
app.get("/", (req, res) => {
   res.send("Hii");
});

if (process.env.NODE_ENV === "production") {
   app.use(express.static(path.join(__dirname, "../frontend/dist")));

   app.get("*", (req, res) => {
      res.sendFile(path.join(__dirname, "../frontend", "dist", "index.html"));
   });
}

server.listen(PORT, () => {
   console.log(`🚀 Server running on http://localhost:${PORT}/`);
   connectDB();
});
