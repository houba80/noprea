import express from 'express';
import bcrypt from 'bcrypt';
import crypto from 'crypto'; // مكتبة مدمجة في نود لتوليد الباسوردات
import User from '../models/User.js';
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();

// 🟢 دالة فحص قوة الباسورد
const isValidPassword = (password) => {
  const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&#])[A-Za-z\d@$!%*?&#]{8,}$/;
  return regex.test(password);
};

// 🟢 دالة توليد باسورد عشوائي قوي
const generateSecurePassword = () => {
  const randomStr = crypto.randomBytes(8).toString('base64').replace(/[^a-zA-Z0-9]/g, '');
  return `${randomStr}1!Aa`; // بنضمن وجود كل الشروط
};

const adminOnly = (req, res, next) => {
  if (req.user && req.user.role === 'superadmin') next();
  else res.status(403).json({ message: 'Not authorized as an admin' });
};

router.put('/profile', protect, async (req, res) => {
  try {
    const user = await User.findById(req.user.id);
    if (!user) return res.status(404).json({ message: 'User not found' });

    if (req.body.password) {
      if (!isValidPassword(req.body.password)) {
        return res.status(400).json({ message: 'Password must be at least 8 characters, include uppercase, lowercase, number, and special character.' });
      }
      const salt = await bcrypt.genSalt(10);
      user.password = await bcrypt.hash(req.body.password, salt);
    }

    await user.save();
    res.json({ message: '✅ Password updated successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.get('/', protect, adminOnly, async (req, res) => {
  const users = await User.find({}).select('-password');
  res.json(users);
});

router.post('/', protect, adminOnly, async (req, res) => {
  const { username, role, permissions } = req.body;
  let { password } = req.body;
  
  const userExists = await User.findOne({ username });
  if (userExists) return res.status(400).json({ message: 'User already exists' });

  let generatedPassword = null;

  // 🟢 لو مفيش باسورد، اعمله Generate. لو فيه، افحصه.
  if (!password) {
    password = generateSecurePassword();
    generatedPassword = password; // هنبعته في الرد عشان السوبر أدمن يشوفه
  } else if (!isValidPassword(password)) {
    return res.status(400).json({ message: 'Password must be at least 8 characters, include uppercase, lowercase, number, and special character.' });
  }

  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);

  const user = await User.create({ username, password: hashedPassword, role, permissions });
  
  // بنبعت الباسورد العشوائي مرة واحدة بس في الرد
  res.status(201).json({
    _id: user._id,
    username: user.username,
    role: user.role,
    permissions: user.permissions,
    generatedPassword: generatedPassword || 'User provided password'
  });
});

router.put('/:id', protect, adminOnly, async (req, res) => {
  const { username, role, permissions, password } = req.body;
  const user = await User.findById(req.params.id);
  if (!user) return res.status(404).json({ message: 'User not found' });

  user.username = username || user.username;
  user.role = role || user.role;
  user.permissions = permissions || user.permissions;
  
  if (password) {
    if (!isValidPassword(password)) {
      return res.status(400).json({ message: 'Password must be at least 8 characters, include uppercase, lowercase, number, and special character.' });
    }
    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(password, salt);
  }

  const updatedUser = await user.save();
  res.json({
    _id: updatedUser._id,
    username: updatedUser.username,
    role: updatedUser.role,
    permissions: updatedUser.permissions
  });
});

router.delete('/:id', protect, adminOnly, async (req, res) => {
  await User.findByIdAndDelete(req.params.id);
  res.json({ message: 'User deleted' });
});

export default router;