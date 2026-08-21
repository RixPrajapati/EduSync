import { Resend } from 'resend';
import config from '../config/config.js';

let resend;

const sendEmail = async ({ recipient, subject, html }) => {
  if (!resend) resend = new Resend(config.resend_email_api_key);
  const { error } = await resend.emails.send({
    from: config.resend_from_email,
    to: recipient,
    subject,
    html,
  });
  if (error) {
    throw new Error(error.message || "Failed to send email");
  }
};

export default sendEmail;



