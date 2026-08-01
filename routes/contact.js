import express from 'express';
import nodemailer from 'nodemailer';

const router = express.Router();

router.post('/', async (req, res) => {
  const { name, email, phone, message } = req.body;

  try {
    // إعداد سيرفر الإيميل (Transport)
    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: process.env.SMTP_PORT,
      secure: process.env.SMTP_SECURE === 'true', // true للـ 465 و false للـ 587
      auth: {
        user: process.env.SUPPORT_EMAIL,
        pass: process.env.SUPPORT_PASS,
      },
    });

    // شكل الإيميل اللي هيوصل لصاحب الفندق
    const mailOptions = {
      from: `"${name}" <${process.env.SUPPORT_EMAIL}>`, // بيتبعت من إيميل السيرفر عشان مايدخلش Spam
      replyTo: email, // عشان لما تدوس Reply يترد على العميل
      to: process.env.SUPPORT_EMAIL,
      subject: `🛎️ New Quick Enquiry from ${name}`,
      html: `
        <div style="font-family: sans-serif; padding: 20px; background-color: #f9f9f9;">
          <h2 style="color: #333;">New Enquiry Details:</h2>
          <table style="width: 100%; max-width: 600px; background-color: #fff; border-radius: 8px; overflow: hidden; box-shadow: 0 2px 4px rgba(0,0,0,0.1);">
            <tr>
              <td style="padding: 15px; border-bottom: 1px solid #eee;"><strong>Name:</strong> ${name}</td>
            </tr>
            <tr>
              <td style="padding: 15px; border-bottom: 1px solid #eee;"><strong>Email:</strong> ${email}</td>
            </tr>
            <tr>
              <td style="padding: 15px; border-bottom: 1px solid #eee;"><strong>Phone:</strong> ${phone || 'Not provided'}</td>
            </tr>
            <tr>
              <td style="padding: 15px;"><strong>Message:</strong><br/> <p style="color: #555; line-height: 1.5;">${message}</p></td>
            </tr>
          </table>
        </div>
      `,
    };

    // إرسال الإيميل
    await transporter.sendMail(mailOptions);

    res.status(200).json({ message: 'Enquiry sent successfully!' });
  } catch (error) {
    console.error("❌ Contact Email Error:", error);
    res.status(500).json({ message: 'Failed to send enquiry. Please try again later.' });
  }
});

export default router;