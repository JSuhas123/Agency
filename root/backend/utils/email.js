import dotenv from 'dotenv';
import nodemailer from 'nodemailer';

dotenv.config();

/**
 * @typedef {Object} AuditNotificationData
 * @property {string} fullName
 * @property {string} companyName
 * @property {string} email
 * @property {string} [website]
 * @property {string} industry
 * @property {string} challenges
 */

/**
 * Send an audit notification email
 * @param {AuditNotificationData} data
 */
export const sendAuditNotification = async (data) => {
  try {
    const transporter = nodemailer.createTransport({
      host: process.env.EMAIL_HOST,
      port: parseInt(process.env.EMAIL_PORT || '587'),
      secure: process.env.EMAIL_SECURE === 'true',
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
      }
    });

    const mailOptions = {
      from: `"AI Audit Bot" <${process.env.EMAIL_FROM}>`,
      to: process.env.NOTIFY_EMAIL,
      subject: `🤖 New AI Audit: ${data.fullName} (${data.companyName})`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #4f46e5;">New AI Audit Request</h2>
          <table style="width: 100%; border-collapse: collapse;">
            <tr><td style="padding: 8px; border-bottom: 1px solid #e5e7eb; font-weight: bold;">Name:</td><td style="padding: 8px; border-bottom: 1px solid #e5e7eb;">${data.fullName}</td></tr>
            <tr><td style="padding: 8px; border-bottom: 1px solid #e5e7eb; font-weight: bold;">Company:</td><td style="padding: 8px; border-bottom: 1px solid #e5e7eb;">${data.companyName}</td></tr>
            <tr><td style="padding: 8px; border-bottom: 1px solid #e5e7eb; font-weight: bold;">Email:</td><td style="padding: 8px; border-bottom: 1px solid #e5e7eb;"><a href="mailto:${data.email}">${data.email}</a></td></tr>
            <tr><td style="padding: 8px; border-bottom: 1px solid #e5e7eb; font-weight: bold;">Website:</td><td style="padding: 8px; border-bottom: 1px solid #e5e7eb;"><a href="${data.website}" target="_blank">${data.website || 'N/A'}</a></td></tr>
            <tr><td style="padding: 8px; border-bottom: 1px solid #e5e7eb; font-weight: bold;">Industry:</td><td style="padding: 8px; border-bottom: 1px solid #e5e7eb;">${data.industry}</td></tr>
            <tr><td style="padding: 8px; font-weight: bold;">Challenges:</td><td style="padding: 8px;">${data.challenges}</td></tr>
          </table>
          <div style="margin-top: 20px; text-align: center;">
            <a href="${process.env.ADMIN_DASHBOARD_URL}" style="display: inline-block; background-color: #4f46e5; color: white; padding: 10px 20px; text-decoration: none; border-radius: 4px;">View in Dashboard</a>
          </div>
        </div>
      `
    };

    await transporter.sendMail(mailOptions);
    return { success: true };
  } catch (error) {
    console.error('Error sending audit notification email:', error);
    return { success: false, error };
  }
};
