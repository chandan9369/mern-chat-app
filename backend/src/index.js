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

if (process.env.NODE_ENV === "production") {
   const frontendDist = path.resolve("../frontend/dist");

   // Serve static files
   app.use(express.static(frontendDist));

   // Serve index.html for all non-API routes
   app.get("*", (req, res) => {
      // Ignore API routes
      if (req.path.startsWith("/api/")) {
         return res.status(404).send("API route not found");
      }
      res.sendFile(path.join(frontendDist, "index.html"));
   });
}

server.listen(PORT, () => {
   console.log(`🚀 Server running on http://localhost:${PORT}/`);
   connectDB();
});
