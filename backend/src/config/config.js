import dotenv from "dotenv";

dotenv.config();

const config = {
  port: process.env.PORT || "",
  app_url: process.env.APP_URL || "",
  dburl: process.env.MONGODB_URL || "",
  jwtSecret: process.env.JWT_SECRET,
  cloudinary: {
    cloudname: process.env.CLOUDINARY_CLOUD_NAME || "",
    apikey: process.env.CLOUDINARY_API_KEY || "",
    apisecret: process.env.CLOUDINARY_API_SECRET || "",
  },
  resend_email_api_key: process.env.RESEND_EMAIL_API_KEY || "",
  // Resend's shared sandbox sender — only works for test sends to the account
  // owner. Set RESEND_FROM_EMAIL to a verified domain address before relying
  // on this in production.
  resend_from_email: process.env.RESEND_FROM_EMAIL || "onboarding@resend.dev",
  // Comma-separated list of allowed frontend origins, e.g. "https://app.edusync.com,https://staging.edusync.com"
  corsOrigins: (process.env.CORS_ORIGIN || "http://localhost:5173")
    .split(",")
    .map((origin) => origin.trim())
    .filter(Boolean),
};
export default config;
