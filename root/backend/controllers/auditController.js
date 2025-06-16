import axios from 'axios';
import twilio from 'twilio';
import Audit from '../models/Audit.js';
import { verifyCaptcha } from '../utils/captcha.js';
import { sendAuditNotification } from '../utils/email.js';

export const submitAudit = async (req, res) => {
  try {
    const {
      fullName,
      companyName,
      email,
      website,
      industry,
      challenges,
      revenue,
      teamSize,
      captchaToken
    } = req.body;

    // Verify CAPTCHA
    if (!(await verifyCaptcha(captchaToken))) {
      return res.status(400).json({
        success: false,
        error: 'Invalid CAPTCHA verification'
      });
    }

    // Save to MongoDB
    const audit = new Audit({
      fullName,
      companyName,
      email,
      website,
      industry,
      challenges,
      revenue,
      teamSize
    });
    await audit.save();

    // Send email notification
    await sendAuditNotification({
      fullName,
      companyName,
      email,
      website,
      industry,
      challenges
    });

    // Slack notification
    if (process.env.SLACK_WEBHOOK_URL) {
      await axios.post(process.env.SLACK_WEBHOOK_URL, {
        text: `🧠 *New AI Audit Request*\n*Name:* ${fullName}\n*Company:* ${companyName}\n*Email:* ${email}\n*Industry:* ${industry}\n*Challenges:* ${challenges.slice(0, 100)}...`
      });
    }

    // WhatsApp notification (using Twilio API)
    const client = twilio(
      process.env.TWILIO_ACCOUNT_SID,
      process.env.TWILIO_AUTH_TOKEN
    );
    await client.messages.create({
      body: `New AI Audit: ${fullName} from ${companyName} (${industry})`,
      from: 'whatsapp:+14155238886',
      to: `whatsapp:${process.env.ADMIN_PHONE}`
    });

    // Zapier webhook for CRM integration
    if (process.env.ZAPIER_WEBHOOK_URL) {
      await axios.post(process.env.ZAPIER_WEBHOOK_URL, {
        ...req.body,
        audit_value: 1375000,
        source: 'AI Audit Landing Page'
      });
    }

    return res.status(200).json({
      success: true,
      message: 'Audit request submitted successfully!'
    });
  } catch (error) {
    console.error('Error submitting audit:', error);
    return res.status(500).json({
      success: false,
      error: 'Internal Server Error',
      details: error && error.message ? error.message : String(error)
    });
  }
};
