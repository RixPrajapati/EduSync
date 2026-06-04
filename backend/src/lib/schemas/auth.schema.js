import { mailRex } from "../../constants/regex.js";
import userSchema from "./user.schemas.js";
import z from 'zod'
export const registerSchema=userSchema;
export const loginSchema=z .object({
      email: z
        .string({ required_error: "Email is required " })
        .regex(mailRex, { required_error: "Email format is not valid " })
        .optional(),
      phone: z.string({ required_error: "Phone is required" }).optional(),

      password: z.string({ required_error: "Password is required" }),
    })
    .refine((data) => data.email || data.phone, {
      message: "Either phone  or email is required ",
      path: ["email", "phone"],
    });
