// import express from "express";
// import "dotenv/config.js";
// import cookieParser from "cookie-parser";
// import authRoutes from "./routes/auth.route.js";
// import messageRoutes from "./routes/message.route.js";

// import path from "path";

// import { connectDB } from "./lib/db.js";
// import cors from "cors";
// import { app, server } from "./lib/socket.js";

// const PORT = process.env.PORT || 5000;

// const __dirname = path.resolve();

// // ✅ Middleware (must come before routes)
// app.use(express.json({ limit: "10mb" })); // increase payload size
// app.use(express.urlencoded({ limit: "10mb", extended: true }));
// app.use(cookieParser());
// app.use(
//    cors({
//       origin: "http://localhost:5173", // your frontend
//       credentials: true, // allow cookies
//       methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
//       allowedHeaders: ["Content-Type", "Authorization"],
//    })
// );

// // ✅ Routes
// app.use("/api/auth", authRoutes);
// app.use("/api/messages", messageRoutes);

// // Default route
// app.get("/", (req, res) => {
//    res.send("Hii");
// });

// if (process.env.NODE_ENV === "production") {
//    app.use(express.static(path.join(__dirname, "../frontend/dist")));

//    app.get(/(.*)/, (req, res) => {
//       res.sendFile(path.join(__dirname, "../frontend", "dist", "index.html"));
//    });
// }

// server.listen(PORT, () => {
//    console.log(`🚀 Server running on http://localhost:${PORT}/`);
//    connectDB();
// });
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

// ✅ Middleware
app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ limit: "10mb", extended: true }));
app.use(cookieParser());
app.use(
   cors({
      origin:
         process.env.NODE_ENV === "production"
            ? "https://mern-chat-app-1-es4j.onrender.com" // deployed frontend URL
            : "http://localhost:5173",
      credentials: true,
      methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
      allowedHeaders: ["Content-Type", "Authorization"],
   })
);

// ✅ API Routes
app.use("/api/auth", authRoutes);
app.use("/api/messages", messageRoutes);

// ✅ Serve frontend in production
if (process.env.NODE_ENV === "production") {
   const frontendDist = path.resolve("../frontend/dist");

   app.use(express.static(frontendDist));

   // Serve index.html for all non-API routes
   app.get(/(.*)/, (req, res) => {
      if (req.path.startsWith("/api/")) {
         return res.status(404).send("API route not found");
      }
      res.sendFile(path.join(frontendDist, "index.html"));
   });
}

// Start server
server.listen(PORT, () => {
   console.log(`🚀 Server running on http://localhost:${PORT}/`);
   connectDB();
});
