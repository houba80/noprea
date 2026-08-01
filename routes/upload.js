import express from 'express';
import multer from 'multer';
import sharp from 'sharp';
import path from 'path';
import fs from 'fs';
import { protect } from '../middleware/authMiddleware.js'; 

const router = express.Router();

if (!fs.existsSync('uploads')) {
  fs.mkdirSync('uploads');
}

const storage = multer.memoryStorage();
const upload = multer({ storage });

// 1. الرفع الفردي (بيُستخدم لصورة الغرفة الرئيسية أو كفر الألبوم)
router.post('/', protect, upload.single('image'), async (req, res) => {
  try {
    if (!req.file) return res.status(400).json({ message: 'Please upload an image!' });
    const filename = `noprea-${Date.now()}.webp`;
    await sharp(req.file.buffer).resize(1200, 800, { fit: 'inside', withoutEnlargement: true }).webp({ quality: 80 }).toFile(path.join('uploads', filename));
    res.status(201).json({ message: '✅ Image uploaded!', imageUrl: `/uploads/${filename}` });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// 2. الرفع الجماعي Bulk Upload (بيُستخدم لرفع صور الجاليري الداخلية)
router.post('/bulk', protect, upload.array('images', 20), async (req, res) => {
  try {
    if (!req.files || req.files.length === 0) return res.status(400).json({ message: 'Please upload images!' });
    
    const uploadedUrls = [];
    // معالجة كل الصور في نفس الوقت
    for (const file of req.files) {
      const filename = `noprea-${Date.now()}-${Math.round(Math.random() * 1000)}.webp`;
      await sharp(file.buffer).resize(1200, 800, { fit: 'inside', withoutEnlargement: true }).webp({ quality: 80 }).toFile(path.join('uploads', filename));
      uploadedUrls.push(`/uploads/${filename}`);
    }

    res.status(201).json({ message: '✅ Images uploaded!', imageUrls: uploadedUrls });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

export default router;