const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
  host: 'smtp.gmail.com',
  port: 587,          // ✅ Use TLS
  secure: false,      // ✅ TLS requires secure: false
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
  tls: {
    rejectUnauthorized: false, // ✅ Avoid self-signed cert issues
  },
});

const sendEmail = async (options) => {
  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: options.to,
    subject: options.subject,
    text: options.text,
  };

  try {
    await transporter.sendMail(mailOptions);
    console.log('✅ Email sent successfully to', options.to);
  } catch (error) {
    console.error('❌ Error sending email:', error.message);
    throw new Error('Email could not be sent');
  }
};

module.exports = sendEmail;
