import express from 'express';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// 🟢 نفس الدالة الذكية عشان يلاقي فولدر الصور الجديد
const findFolderUpwards = (startDir, folderName) => {
  let currentDir = startDir;
  while (currentDir !== path.parse(currentDir).root) {
    const targetPath = path.join(currentDir, folderName);
    if (fs.existsSync(targetPath)) return targetPath;
    currentDir = path.dirname(currentDir);
  }
  return null;
};

const persistentUploadsPath = findFolderUpwards(__dirname, 'persistent_uploads') || path.join(__dirname, '../uploads');

// 1. جلب كل الصور وعرضها
router.get('/', async (req, res) => {
  try {
    if (!fs.existsSync(persistentUploadsPath)) {
      return res.json([]);
    }

    const files = fs.readdirSync(persistentUploadsPath);
    
    // فلترة الملفات عشان نعرض الصور بس ونرتبهم من الأحدث للأقدم
    const mediaFiles = files
      .filter(file => file.match(/\.(jpg|jpeg|png|gif|webp)$/i))
      .map(file => {
        const filePath = path.join(persistentUploadsPath, file);
        const stats = fs.statSync(filePath);
        return {
          name: file,
          url: `/uploads/${file}`,
          createdAt: stats.mtime.getTime()
        };
      })
      .sort((a, b) => b.createdAt - a.createdAt);

    res.json(mediaFiles);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// 2. حذف صورة من السيرفر
router.delete('/:filename', protect, async (req, res) => {
  try {
    const { filename } = req.params;
    const filePath = path.join(persistentUploadsPath, filename);

    if (fs.existsSync(filePath)) {
      fs.unlinkSync(filePath);
      res.json({ message: '✅ Image deleted permanently' });
    } else {
      res.status(404).json({ message: 'Image not found' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

export default router;