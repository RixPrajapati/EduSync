import rateLimit from "express-rate-limit";

// Applies to login/register/password-reset — the endpoints an attacker would
// use to brute-force a password, spam-create accounts, or enumerate emails.
export const authRateLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  limit: 20,
  standardHeaders: true,
  legacyHeaders: false,
  message: { message: "Too many attempts. Please try again later." },
});
