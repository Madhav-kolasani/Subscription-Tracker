import nodemailer from 'nodemailer';
import { EMAIL_PASSWORD } from './env.js';

export const accountEmail = 'yagnamadhavkolasani2004@gmail.com';

const transporter = nodemailer.createTransport({
  host: 'smtp.gmail.com',
  port: 465,           // SSL port
  secure: true,        // true for 465, false for 587
  auth: {
    user: accountEmail,
    pass: EMAIL_PASSWORD, // must be a Gmail App Password
  },
});

// Optional: verify SMTP connection before sending
transporter.verify((error, success) => {
  if (error) console.log('SMTP connection error:', error);
  else console.log('SMTP connection ready');
});

export default transporter;
