import { ZodError } from "zod";
import { ApiError } from "../utils/ApiError.js";

const validation = (schema) => (req, res, next) => {
  try {
    const val = schema.parse(req.body);
    req.body = val; // Assign parsed data back, can handle defaults
    next();
  } catch (err) {
    if (err instanceof ZodError) {
      // Format Zod errors to extract message
      const errors = (err.issues || []).map((e) => ({
        path: e.path.join("."),
        message: e.message,
      }));
      next(new ApiError(400, "Validation Error", errors));
    } else {
      next(new ApiError(400, err.message));
    }
  }
};

export default validation;
