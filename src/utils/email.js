import { Resend } from 'resend';
import config from '../config/config.js';

const resend = new Resend(config.resend_email_api_key);



const sendEmail=({recipient,subject,html})=>{
resend.emails.send({
  from: 'onboarding@resend.dev',
  to: recipient,
  subject,
  html,
});

}

export default sendEmail;



