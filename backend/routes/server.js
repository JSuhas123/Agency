require('dotenv').config();
const express = require('express');
const cors = require('cors');
const nodemailer = require('nodemailer');

const app = express();
app.use(express.json());
app.use(cors());

const PORT = process.env.PORT || 5000;

app.post('/send', async (req, res) => {
    const { to, from, subject, message, replyTo } = req.body;

    if (!to || !from || !subject || !message) {
        return res.status(400).json({ error: 'All fields are required' });
    }

    try {
        let transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: process.env.EMAIL,
                pass: process.env.PASSWORD
            }
        });

        let mailOptions = {
            from: from,
            to: to,
            subject: subject,
            text: message,
            replyTo: replyTo
        };

        await transporter.sendMail(mailOptions);
        res.status(200).json({ success: true, message: "Email sent successfully" });

    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: "Failed to send email" });
    }
});

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
