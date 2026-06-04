import { ApiError } from "../utils/ApiError.js";
import { logger } from "../utils/logger.js";

const errorHandler = (err, req, res, next) => {
  let error = err;

  // If the error is not an instance of ApiError, create a new ApiError
  if (!(error instanceof ApiError)) {
    const statusCode = error.statusCode || error instanceof Error ? 500 : 400;
    const message = error.message || "Internal Server Error";
    error = new ApiError(statusCode, message, error?.errors || [], err.stack);
  }

  const response = {
    ...error,
    message: error.message,
    ...(process.env.NODE_ENV === "development" ? { stack: error.stack } : {}),
  };

  // Log the error
  logger.error(`${error.message} - ${req.originalUrl} - ${req.method} - ${req.ip}`);

  return res.status(error.statusCode).json(response);
};

export { errorHandler };
