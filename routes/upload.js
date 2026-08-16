import express from 'express';
import multer from 'multer';
import sharp from 'sharp';
import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';
import { protect } from '../middleware/authMiddleware.js'; 

const router = express.Router();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

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

if (!fs.existsSync(persistentUploadsPath)) {
  fs.mkdirSync(persistentUploadsPath, { recursive: true });
}

const storage = multer.memoryStorage();
const upload = multer({ storage });

const generateSEOFileName = (originalname) => {
  const nameWithoutExt = path.parse(originalname).name;
  const safeName = nameWithoutExt.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, '');
  return `${safeName}-${Date.now().toString().slice(-4)}.webp`; 
};

// 1. الرفع الفردي
router.post('/', protect, upload.single('image'), async (req, res) => {
  try {
    if (!req.file) return res.status(400).json({ message: 'Please upload an image!' });
    
    const filename = generateSEOFileName(req.file.originalname);
    
    await sharp(req.file.buffer)
      .resize(1200, 800, { fit: 'inside', withoutEnlargement: true })
      .webp({ quality: 80 })
      .toFile(path.join(persistentUploadsPath, filename));
      
    res.status(201).json({ message: '✅ Image uploaded!', imageUrl: `/uploads/${filename}` });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// 2. الرفع الجماعي (Bulk Upload)
router.post('/bulk', protect, upload.array('images', 20), async (req, res) => {
  try {
    if (!req.files || req.files.length === 0) return res.status(400).json({ message: 'Please upload images!' });
    
    const uploadedUrls = [];
    
    for (const file of req.files) {
      const filename = generateSEOFileName(file.originalname);
      
      await sharp(file.buffer)
        .resize(1200, 800, { fit: 'inside', withoutEnlargement: true })
        .webp({ quality: 80 })
        .toFile(path.join(persistentUploadsPath, filename));
        
      uploadedUrls.push(`/uploads/${filename}`);
    }

    res.status(201).json({ message: '✅ Images uploaded!', imageUrls: uploadedUrls });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

export default router;