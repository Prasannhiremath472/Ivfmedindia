const nodemailer = require('nodemailer');
const logger = require('./logger');

const createTransporter = () => {
  return nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: parseInt(process.env.SMTP_PORT) || 587,
    secure: process.env.SMTP_PORT === '465',
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS,
    },
  });
};

const sendEmail = async ({ to, subject, html, text }) => {
  try {
    const transporter = createTransporter();
    const info = await transporter.sendMail({
      from: `"${process.env.EMAIL_FROM_NAME}" <${process.env.EMAIL_FROM}>`,
      to,
      subject,
      html,
      text,
    });
    logger.info(`Email sent: ${info.messageId}`);
    return { success: true, messageId: info.messageId };
  } catch (error) {
    logger.error('Email sending failed:', error);
    return { success: false, error: error.message };
  }
};

const appointmentConfirmationTemplate = (data) => `
<!DOCTYPE html>
<html>
<head><meta charset="UTF-8"><title>Appointment Confirmation</title></head>
<body style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; background: #f9f9f9;">
  <div style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); padding: 30px; text-align: center;">
    <h1 style="color: white; margin: 0; font-size: 28px;">IVFMedIndia</h1>
    <p style="color: rgba(255,255,255,0.9); margin: 5px 0 0;">Your Fertility Journey Begins Here</p>
  </div>
  <div style="background: white; padding: 40px; border-radius: 0 0 8px 8px;">
    <h2 style="color: #333; margin-bottom: 20px;">Appointment Confirmed!</h2>
    <p style="color: #666;">Dear ${data.patientName},</p>
    <p style="color: #666;">Your appointment has been successfully scheduled.</p>
    <div style="background: #f0f4ff; border-radius: 8px; padding: 20px; margin: 20px 0;">
      <p style="margin: 8px 0;"><strong>Doctor:</strong> Dr. ${data.doctorName}</p>
      <p style="margin: 8px 0;"><strong>Date:</strong> ${data.appointmentDate}</p>
      <p style="margin: 8px 0;"><strong>Time:</strong> ${data.appointmentTime}</p>
      <p style="margin: 8px 0;"><strong>Location:</strong> ${data.location}</p>
      <p style="margin: 8px 0;"><strong>Booking ID:</strong> ${data.bookingId}</p>
    </div>
    <p style="color: #666;">Please arrive 15 minutes before your scheduled time. Carry your previous medical reports if any.</p>
    <div style="text-align: center; margin: 30px 0;">
      <a href="tel:+918888888888" style="background: linear-gradient(135deg, #667eea, #764ba2); color: white; padding: 12px 30px; border-radius: 25px; text-decoration: none; font-weight: bold;">Call Us: +91 8888 888 888</a>
    </div>
    <p style="color: #999; font-size: 13px; text-align: center; margin-top: 30px;">© 2024 IVFMedIndia. All rights reserved.</p>
  </div>
</body>
</html>
`;

const leadNotificationTemplate = (data) => `
<!DOCTYPE html>
<html>
<body style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
  <div style="background: #667eea; padding: 20px; text-align: center;">
    <h2 style="color: white; margin: 0;">New Lead - IVFMedIndia</h2>
  </div>
  <div style="background: white; padding: 30px;">
    <h3>New Lead Details:</h3>
    <p><strong>Name:</strong> ${data.name}</p>
    <p><strong>Phone:</strong> ${data.phone}</p>
    <p><strong>Email:</strong> ${data.email || 'Not provided'}</p>
    <p><strong>Treatment:</strong> ${data.treatment || 'Not specified'}</p>
    <p><strong>Location:</strong> ${data.location || 'Not specified'}</p>
    <p><strong>Message:</strong> ${data.message || 'No message'}</p>
    <p><strong>Source:</strong> ${data.source || 'Website'}</p>
    <p><strong>Time:</strong> ${new Date().toLocaleString('en-IN')}</p>
  </div>
</body>
</html>
`;

module.exports = {
  sendEmail,
  appointmentConfirmationTemplate,
  leadNotificationTemplate,
};
