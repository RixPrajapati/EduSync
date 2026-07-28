import express from "express";
import cors from "cors";

import config from "./config/config.js";
import connectDB from "./config/database.js";
import connectCloudinary from "./config/cloudinary.js";

import authRoute from "./routes/auth.routes.js"

import userRoute from "./routes/user.routes.js"
import teacherRoutes from "./routes/teacher.routes.js"
import studentRoute from "./routes/student.routes.js";
import timetableRoute from "./routes/timetable.routes.js"

const app = express();

// Database Connection
connectDB();

// Cloudinary Connection
connectCloudinary();

// Middlewares
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.use("/api/users", userRoute);
app.use("/api/auth", authRoute);
app.use("/api/teachers", teacherRoutes);
app.use("/api/students", studentRoute);
app.use("/api/timetables", timetableRoute);

// Default Route
app.get("/", (req, res) => {
    res.status(200).json({
        success: true,
        message: "School Management API is running successfully.",
    });
});

// 404 Route
app.use((req, res) => {
    res.status(404).json({
        success: false,
        message: "Route not found.",
    });
});

// Start Server
app.listen(config.port, () => {
    console.log(`🚀 Server running at http://localhost: ${config.port}`);
});