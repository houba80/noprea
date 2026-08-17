import express from 'express';
import nodemailer from 'nodemailer';

const router = express.Router();

router.post('/', async (req, res) => {
  const { email } = req.body;

  if (!email) return res.status(400).json({ message: 'Email is required' });

  try {
    // 1. سيرفر إرسال الترحيب للعميل (visitaswan@)
    const newsletterTransporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: Number(process.env.SMTP_PORT),
      secure: process.env.SMTP_SECURE === 'true',
      auth: {
        user: process.env.NEWSLETTER_EMAIL,
        pass: process.env.NEWSLETTER_PASS,
      },
    });

    // 2. سيرفر إشعار الأدمن المجرب والشغال (support@)
    const supportTransporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: Number(process.env.SMTP_PORT),
      secure: process.env.SMTP_SECURE === 'true',
      auth: {
        user: process.env.SUPPORT_EMAIL,
        pass: process.env.SUPPORT_PASS,
      },
    });

    // أ. إيميل الترحيب للعميل
    const welcomeMailOptions = {
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

    // ب. إشعار الأدمن بنفس طريقة Contact الناجحة
    const adminMailOptions = {
      from: `"NOPREA System" <${process.env.SUPPORT_EMAIL}>`,
      to: process.env.SUPPORT_EMAIL,
      replyTo: email,
      subject: `📬 New Newsletter Subscriber: ${email}`,
      html: `
        <div style="font-family: sans-serif; padding: 20px; background-color: #f9f9f9;">
          <h2 style="color: #333;">New Subscriber Alert 🎉</h2>
          <p style="font-size: 14px; color: #555;">A new guest subscribed to the newsletter:</p>
          <p style="font-size: 16px; font-weight: bold; color: #1a1a1a; background: #fff; padding: 12px; border-radius: 6px; border: 1px solid #ddd; display: inline-block;">
            ${email}
          </p>
        </div>
      `,
    };

    // تنفيذ الإرسال فوراً
    await newsletterTransporter.sendMail(welcomeMailOptions);
    await supportTransporter.sendMail(adminMailOptions);

    res.status(200).json({ message: 'Successfully subscribed to the newsletter!' });
  } catch (error) {
    console.error("❌ Newsletter Email Error:", error);
    res.status(500).json({ message: 'Failed to subscribe. Please try again.' });
  }
});

export default router;