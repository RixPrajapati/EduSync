import Express from 'express'
import config from './config/config.js';
import userRouter from './routes/user.route.js';
import authRouter from "./routes/auth.route.js"
import dataBaseConnection from './config/dbConnection.js';
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import multer from 'multer';
import cloudinaryConnection from './config/cloudinary.js';
import { errorHandler } from './middleware/errorHandler.js';
import cors from "cors";
import noticeRouter from "./routes/notice.route.js"

import swaggerUi from "swagger-ui-express";
import swaggerSpecs from "./docs/swagger.js";
import attendanceRouter from "./routes/attendance.route.js";
import courseRouter from "./routes/course.route.js";
import marksRouter from "./routes/marks.route.js";

import teacherRoutes from "./routes/teacher.routes.js"
import studentRoute from "./routes/student.routes.js";
import timetableRoute from "./routes/timetable.routes.js"
import assignmentRoute from "./routes/assignment.route.js"
import feeRoute from "./routes/fee.route.js"

const app = Express();

dataBaseConnection();
cloudinaryConnection();
app.use(bodyParser.json());
app.use(cookieParser());
app.use(cors({ origin: config.corsOrigins, credentials: true }));

const upload = multer({
  storage: multer.memoryStorage(),
  limits: { fileSize: 10 * 1024 * 1024 }, // 10MB — memoryStorage buffers the whole file in RAM
});

app.use("/api/user", upload.array("profile", 12), userRouter);
app.use("/api/auth", upload.array("profile", 12), authRouter);
app.use("/api/attendance", attendanceRouter);
app.use("/api/course", courseRouter);
app.use("/api/marks", marksRouter);

app.use("/api/teachers", teacherRoutes);
app.use("/api/students", studentRoute);
app.use("/api/timetables", timetableRoute);
app.use("/api/notice", noticeRouter);
app.use("/api/assignments", assignmentRoute);
app.use("/api/fees", feeRoute);

// Swagger documentation
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpecs));

app.use(errorHandler);

export default app;
