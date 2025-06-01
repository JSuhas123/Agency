import axios from 'axios';
import { Request, Response } from 'express';
import nodemailer from 'nodemailer';
import { AuditModel } from '../models/Audit';

export const submitAudit = async (req: Request, res: Response) => {
  try {
    const {
      fullName,
      companyName,
      email,
      website,
      industry,
      challenges,
    } = req.body;

    // 1. Save to MongoDB
    await AuditModel.create({
      fullName,
      companyName,
      email,
      website,
      industry,
      challenges,
    });

    // 2. Send Email (Nodemailer)
    const transporter = nodemailer.createTransport({
      service: 'gmail', // Or 'SendGrid', etc.
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    await transporter.sendMail({
      from: `"AI Audit Bot" <${process.env.EMAIL_USER}>`,
      to: process.env.NOTIFY_EMAIL,
      subject: `🧠 New AI Audit: ${fullName} (${companyName})`,
      text: `
New Audit Request:
Name: ${fullName}
Company: ${companyName}
Email: ${email}
Website: ${website}
Industry: ${industry}
Challenges: ${challenges}
      `,
    });

    // 3. Slack Webhook Notification
    await axios.post(process.env.SLACK_WEBHOOK_URL!, {
      text: `🧠 *New AI Audit*\n*Name:* ${fullName}\n*Company:* ${companyName}\n*Email:* ${email}\n*Industry:* ${industry}`,
    });

    // 4. WhatsApp Webhook Notification (using Twilio or Gupshup as example)
    await axios.post(process.env.WHATSAPP_WEBHOOK_URL!, {
      to: process.env.WHATSAPP_YOUR_NUMBER,
      message: `🧠 New AI Audit\nName: ${fullName}\nCompany: ${companyName}\nEmail: ${email}\nChallenges: ${challenges}`,
    });

    return res.status(200).json({ message: 'Audit submitted successfully!' });
  } catch (error) {
    console.error('Error submitting audit:', error);
    return res.status(500).json({ error: 'Internal Server Error' });
  }
};
