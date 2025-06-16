import dotenv from 'dotenv';
import nodemailer from 'nodemailer';

dotenv.config();

/**
 * Send an audit result email to the client and notify admin
 * @param {Object} data
 * @param {string} data.fullName
 * @param {string} data.companyName
 * @param {string} data.email
 * @param {string} [data.website]
 * @param {string} data.industry
 * @param {string} data.challenges
 * @param {Object} data.recommendations
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

    // Email to client
    const clientMailOptions = {
      from: `"AI Audit Bot" <${process.env.EMAIL_FROM}>`,
      to: data.email,
      subject: `Your Free AI Audit Results from Surgewing` ,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #4f46e5;">Your AI Audit Results</h2>
          <p>Hi ${data.fullName},</p>
          <p>Thank you for requesting an AI Audit. Here are your personalized recommendations:</p>
          <ul>
            <li><b>AI Opportunity Mapping:</b> ${data.recommendations.aiOpportunityMapping.join(', ')}</li>
            <li><b>ROI Projection Analysis:</b> ${data.recommendations.roiProjectionAnalysis}</li>
            <li><b>Custom AI Strategy Blueprint:</b> ${data.recommendations.customAIStrategyBlueprint.join(', ')}</li>
            <li><b>Risk Assessment & Mitigation:</b> ${data.recommendations.riskAssessmentMitigation.join(', ')}</li>
            <li><b>Team Readiness Evaluation:</b> ${data.recommendations.teamReadinessEvaluation}</li>
            <li><b>Priority Implementation Plan:</b> ${data.recommendations.priorityImplementationPlan.join(', ')}</li>
          </ul>
          <p>If you have questions or want to discuss implementation, reply to this email or book a call with us.</p>
        </div>
      `
    };

    // Email to admin
    const adminMailOptions = {
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
          <h3 style="margin-top: 30px; color: #4f46e5;">Audit Recommendations</h3>
          <ul>
            <li><b>AI Opportunity Mapping:</b> ${data.recommendations.aiOpportunityMapping.join(', ')}</li>
            <li><b>ROI Projection Analysis:</b> ${data.recommendations.roiProjectionAnalysis}</li>
            <li><b>Custom AI Strategy Blueprint:</b> ${data.recommendations.customAIStrategyBlueprint.join(', ')}</li>
            <li><b>Risk Assessment & Mitigation:</b> ${data.recommendations.riskAssessmentMitigation.join(', ')}</li>
            <li><b>Team Readiness Evaluation:</b> ${data.recommendations.teamReadinessEvaluation}</li>
            <li><b>Priority Implementation Plan:</b> ${data.recommendations.priorityImplementationPlan.join(', ')}</li>
          </ul>
        </div>
      `
    };

    await transporter.sendMail(clientMailOptions);
    await transporter.sendMail(adminMailOptions);
    return { success: true };
  } catch (error) {
    console.error('Error sending audit notification email:', error);
    return { success: false, error };
  }
};
