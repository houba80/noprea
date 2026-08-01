import express from 'express';
import ActivityLog from '../models/ActivityLog.js';
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();

// 1. مسار جلب السجل (للسوبر أدمن فقط)
router.get('/', protect, async (req, res) => {
  try {
    if (req.user?.role !== 'superadmin') {
      return res.status(403).json({ message: 'Not authorized' });
    }
    const logs = await ActivityLog.find().sort({ date: -1 }).limit(100);
    res.json(logs);
  } catch (error) {
    console.error("❌ GET Activity Error:", error);
    res.status(500).json({ message: error.toString() });
  }
});

// 2. مسار تسجيل حركة جديدة (بدون protect عشان يسجل الدخول والخروج بحرية)
router.post('/', async (req, res) => {
  try {
    // 🟢 حماية قصوى: التأكد إن الداتا موجودة قبل ما نبعتها للداتا بيس
    const safeUsername = (req.body && req.body.username) ? req.body.username : 'System User';
    const safeAction = (req.body && req.body.action) ? req.body.action : 'Performed an action';

    const log = await ActivityLog.create({
      username: safeUsername,
      action: safeAction
    });
    
    res.status(201).json(log);
  } catch (error) {
    console.error("❌ POST Activity Error:", error);
    // 🟢 لو في مشكلة، هترجعلك رسالة الخطأ الحقيقية في المتصفح
    res.status(500).json({ message: `Database Error: ${error.message}` });
  }
});

export default router;