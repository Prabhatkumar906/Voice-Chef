// backend/utils/email.js

require('dotenv').config(); // To load environment variables
const nodemailer = require('nodemailer');

const sendEmail = async (options) => {
  try {
    // 1. Create a transporter object using SendGrid's SMTP details
    const transporter = nodemailer.createTransport({
      host: 'smtp.sendgrid.net',
      port: 587,
      auth: {
        user: 'apikey', // This is a literal string 'apikey'
        pass: process.env.SENDGRID_API_KEY, // Your SendGrid API key
      },
    });

  // in utils/email.js
const mailOptions = {
    from: 'voicechef7@gmail.com',
    to: options.to, // <-- Change it back to this
    subject: options.subject,
    html: options.html,
  };

    // 3. Actually send the email
    await transporter.sendMail(mailOptions);
    console.log('Email sent successfully');
  } catch (error) {
    console.error('Error sending email:', error);
  }
};

module.exports = sendEmail;