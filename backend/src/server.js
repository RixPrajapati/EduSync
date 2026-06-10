import Express from "express";
import config from "./config/config.js";
import userRouter from "./routes/user.route.js";
import authRouter from "./routes/auth.route.js";
import dataBaseConnection from "./config/dbConnection.js";
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
import multer from "multer";
import cloudinaryConnection from "./config/cloudinary.js";
import { errorHandler } from "./middleware/errorHandler.js";
import { logger } from "./utils/logger.js";

import swaggerUi from "swagger-ui-express";
import swaggerSpecs from "./docs/swagger.js";

const app = Express();

dataBaseConnection();
cloudinaryConnection();
app.use(bodyParser.json());
app.use(cookieParser());

const upload = multer({ storage: multer.memoryStorage() });

app.use("/api/user", upload.array("profile", 12), userRouter);
app.use("/api/auth", upload.array("profile", 12), authRouter);
app.use("/api/attendance", attendance);

// Swagger documentation
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpecs));

app.use(errorHandler);

app.listen(config.port, () => {
  console.log(`Server started at ${config.port}`);
  logger.info(`Server started at ${config.port}`);
});
