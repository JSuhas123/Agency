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
exports.submitAudit = void 0;
const axios_1 = __importDefault(require("axios"));
const twilio_1 = __importDefault(require("twilio"));
const Audit_1 = __importDefault(require("../models/Audit"));
const captcha_1 = require("../utils/captcha");
const email_1 = require("../utils/email");
const submitAudit = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { fullName, companyName, email, website, industry, challenges, revenue, teamSize, captchaToken } = req.body;
        // Verify CAPTCHA
        if (!(yield (0, captcha_1.verifyCaptcha)(captchaToken))) {
            return res.status(400).json({
                success: false,
                error: 'Invalid CAPTCHA verification'
            });
        }
        // Save to MongoDB
        const audit = new Audit_1.default({
            fullName,
            companyName,
            email,
            website,
            industry,
            challenges,
            revenue,
            teamSize
        });
        yield audit.save();
        // Send email notification
        yield (0, email_1.sendAuditNotification)({
            fullName,
            companyName,
            email,
            website,
            industry,
            challenges
        });
        // Slack notification
        if (process.env.SLACK_WEBHOOK_URL) {
            yield axios_1.default.post(process.env.SLACK_WEBHOOK_URL, {
                text: `🧠 *New AI Audit Request*\n*Name:* ${fullName}\n*Company:* ${companyName}\n*Email:* ${email}\n*Industry:* ${industry}\n*Challenges:* ${challenges.slice(0, 100)}...`
            });
        }
        // WhatsApp notification (using Twilio API)
        const client = (0, twilio_1.default)(process.env.TWILIO_ACCOUNT_SID, process.env.TWILIO_AUTH_TOKEN);
        yield client.messages.create({
            body: `New AI Audit: ${fullName} from ${companyName} (${industry})`,
            from: 'whatsapp:+14155238886',
            to: `whatsapp:${process.env.ADMIN_PHONE}`
        });
        // End WhatsApp notification block
        // Zapier webhook for CRM integration
        if (process.env.ZAPIER_WEBHOOK_URL) {
            yield axios_1.default.post(process.env.ZAPIER_WEBHOOK_URL, Object.assign(Object.assign({}, req.body), { audit_value: 1375000, source: 'AI Audit Landing Page' }));
        }
        return res.status(200).json({
            success: true,
            message: 'Audit request submitted successfully!'
        });
    }
    catch (error) {
        console.error('Error submitting audit:', error);
        return res.status(500).json({
            success: false,
            error: 'Internal Server Error',
            details: typeof error === 'object' && error !== null && 'message' in error ? error.message : String(error)
        });
    }
});
exports.submitAudit = submitAudit;
