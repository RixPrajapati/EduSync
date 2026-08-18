import { Resend } from 'resend';
import config from '../config/config.js';

let resend;

const sendEmail=({recipient,subject,html})=>{
if (!resend) resend = new Resend(config.resend_email_api_key);
resend.emails.send({
  from: 'onboarding@resend.dev',
  to: recipient,
  subject,
  html,
});

}

export default sendEmail;



