import nodemailer from 'nodemailer';

interface Audit {
  fullName: string;
  email: string;
  company: string;
  website?: string;
  industry?: string;
  challenges?: string;
  submittedAt?: Date;
}

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER!,
    pass: process.env.EMAIL_PASS!,
  },
});

// 1. Email to Internal Team
export const notifyTeamEmail = async (audit: Audit) => {
  await transporter.sendMail({
    from: '"AI Audit Bot" <no-reply@aiaudit.com>',
    to: process.env.EMAIL_RECEIVER!,
    subject: `📥 New AI Audit: ${audit.fullName}`,
    text: `
🧠 New AI Audit Submitted!

👤 Name: ${audit.fullName}
📧 Email: ${audit.email}
🏢 Company: ${audit.company}
🌐 Website: ${audit.website || 'N/A'}
🏭 Industry: ${audit.industry || 'N/A'}
📌 Challenges: ${audit.challenges || 'N/A'}
🕒 Submitted At: ${new Date().toLocaleString()}
    `.trim(),
  });
};

// 2. Auto-response to Client
export const autoReplyClient = async (audit: Audit) => {
  await transporter.sendMail({
    from: '"AI Audit Team" <no-reply@aiaudit.com>',
    to: audit.email,
    subject: '✅ We’ve received your AI Audit request!',
    text: `
Hi ${audit.fullName},

Thank you for submitting your AI Audit request!

Our team will review your information and get back to you within 24 hours with tailored insights and recommendations for how AI can boost your business.

Meanwhile, feel free to check out our blog or case studies at https://yourdomain.com/resources

Thanks again,  
– The AI Audit Team
    `.trim(),
  });
};
