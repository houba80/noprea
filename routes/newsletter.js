import express from 'express';
import nodemailer from 'nodemailer';

const router = express.Router();

router.post('/', async (req, res) => {
  const { email } = req.body;

  if (!email) return res.status(400).json({ message: 'Email is required' });

  try {
    // إعداد سيرفر الإيميل الخاص بالنشرة البريدية
    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: process.env.SMTP_PORT,
      secure: process.env.SMTP_SECURE === 'true',
      auth: {
        user: process.env.NEWSLETTER_EMAIL,
        pass: process.env.NEWSLETTER_PASS,
      },
    });

    // رسالة الترحيب اللي هتروح للعميل
    const mailOptions = {
      from: `"NOPREA Hotel" <${process.env.NEWSLETTER_EMAIL}>`,
      to: email,
      subject: 'Welcome to NOPREA Hotel Newsletter! 🌅',
      html: `
        <div style="font-family: serif; text-align: center; padding: 40px 20px; background-color: #faf9f6; color: #333;">
          <h1 style="color: #1a1a1a;">Welcome to NOPREA</h1>
          <p style="font-size: 16px; line-height: 1.6; max-width: 500px; margin: 0 auto 20px;">
            Thank you for subscribing! You'll be the first to know about our exclusive offers, cultural events, and breathtaking well-being retreats in Aswan.
          </p>
          <hr style="border: 0; height: 1px; background: #e0e0e0; max-width: 200px; margin: 30px auto;" />
          <p style="font-size: 12px; color: #888;">
            &copy; ${new Date().getFullYear()} NOPREA Hotel. All rights reserved.
          </p>
        </div>
      `,
    };

    await transporter.sendMail(mailOptions);
    
    // (اختياري) ممكن هنا تسجل الإيميل في الداتا بيس عشان تبعتلهم بعدين
    
    res.status(200).json({ message: 'Successfully subscribed to the newsletter!' });
  } catch (error) {
    console.error("❌ Newsletter Email Error:", error);
    res.status(500).json({ message: 'Failed to subscribe. Please try again.' });
  }
});

export default router;