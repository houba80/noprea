import express from 'express';
import fs from 'fs';
import path from 'path';
import { protect } from '../middleware/authMiddleware.js';
import Room from '../models/Room.js';
import Gallery from '../models/Gallery.js';

const router = express.Router();
const uploadsDir = path.join(process.cwd(), 'uploads');

// جلب كل الصور اللي في فولدر uploads
router.get('/', protect, (req, res) => {
  try {
    if (!fs.existsSync(uploadsDir)) fs.mkdirSync(uploadsDir);
    const files = fs.readdirSync(uploadsDir);
    
    // تم التعديل عشان يرجع Object فيه الاسم والمسار للفرونت إند
    const media = files.map(file => ({
      url: `/uploads/${file}`,
      name: file
    }));
    res.json(media);
  } catch (error) {
    res.status(500).json({ message: 'Failed to read media files' });
  }
});

// الحذف الذكي (Smart Delete)
router.delete('/:filename', protect, async (req, res) => {
  try {
    const { filename } = req.params;
    const fileUrl = `/uploads/${filename}`;

    // 1. فحص هل الصورة مستخدمة في أي غرفة (صورة رئيسية أو إضافية)
    const usedInRoom = await Room.findOne({
      $or: [{ image: fileUrl }, { extraImages: fileUrl }]
    });
    if (usedInRoom) {
      return res.status(400).json({ message: `⚠️ Cannot delete! Image is currently used in Room: "${usedInRoom.name}"` });
    }

    // 2. فحص هل الصورة مستخدمة في أي ألبوم جاليري (غلاف أو صورة داخلية)
    const usedInGallery = await Gallery.findOne({
      $or: [{ coverImage: fileUrl }, { 'images.src': fileUrl }]
    });
    if (usedInGallery) {
      return res.status(400).json({ message: `⚠️ Cannot delete! Image is currently used in Gallery Category: "${usedInGallery.title}"` });
    }

    // 3. لو مش مستخدمة، امسحها من السيرفر نهائياً
    const filePath = path.join(uploadsDir, filename);
    if (fs.existsSync(filePath)) {
      fs.unlinkSync(filePath);
      res.json({ message: '✅ File deleted permanently' });
    } else {
      res.status(404).json({ message: 'File not found' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

export default router;