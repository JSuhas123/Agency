"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.sendAuditNotification = void 0;
const dotenv_1 = __importDefault(require("dotenv"));
const nodemailer_1 = __importDefault(require("nodemailer"));
dotenv_1.default.config();
const sendAuditNotification = (data) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const transporter = nodemailer_1.default.createTransport({
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
            subject: `🧠 New AI Audit: ${data.fullName} (${data.companyName})`,
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
        yield transporter.sendMail(mailOptions);
        return { success: true };
    }
    catch (error) {
        console.error('Email sending failed:', error);
        return { success: false, error };
    }
});
exports.sendAuditNotification = sendAuditNotification;
