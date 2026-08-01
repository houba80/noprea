import express from 'express';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import rateLimit from 'express-rate-limit'; 
import User from '../models/User.js';
import ActivityLog from '../models/ActivityLog.js'; 

const router = express.Router();

const loginLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, 
  max: 5, 
  message: { message: 'Too many login attempts from this IP, please try again after 15 minutes.' },
  standardHeaders: true,
  legacyHeaders: false,
});

router.post('/setup', async (req, res) => {
  try {
    const adminExists = await User.findOne({ role: 'superadmin' });
    if (adminExists) {
      return res.status(400).json({ message: 'Super Admin already exists!' });
    }
    
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash('Admin@12345', salt); 

    const admin = await User.create({
      username: 'admin',
      password: hashedPassword,
      role: 'superadmin'
    });

    res.status(201).json({ 
      message: '✅ Super Admin created successfully!', 
      credentials: { username: 'admin', password: 'Admin@12345' } 
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.post('/login', loginLimiter, async (req, res) => {
  try {
    const { username, password } = req.body;
    const user = await User.findOne({ username });

    if (user && (await bcrypt.compare(password, user.password))) {
      // 🟢 التعديل الأمني هنا: خلينا الـ Token ينتهي بعد ساعتين (2h) بدل 30 يوم
      const token = jwt.sign(
        { id: user._id, role: user.role, permissions: user.permissions },
        process.env.JWT_SECRET,
        { expiresIn: '2h' } 
      );

      await ActivityLog.create({
        username: user.username,
        action: 'Logged into the system'
      }).catch(err => console.log('Log Error:', err));

      res.json({ token, username: user.username, role: user.role, permissions: user.permissions });
    } else {
      res.status(401).json({ message: 'Invalid username or password' });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

export default router;