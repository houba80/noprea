import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import path from 'path';
import { fileURLToPath } from 'url';
import fs from 'fs';

import authRoutes from './routes/auth.js';
import roomRoutes from './routes/Rooms.js';
import uploadRoutes from './routes/upload.js';
import galleryRoutes from './routes/gallery.js';
import reviewRoutes from './routes/reviews.js';
import contactRoutes from './routes/contact.js';
import newsletterRoutes from './routes/newsletter.js';
import activityRoutes from './routes/activity.js';
import userRoutes from './routes/users.js';
import mediaRoutes from './routes/media.js';
import retreatRoutes from './routes/retreats.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// 🟢 دالة البحث الأساسية (لازم تفضل عشان توصلنا للفولدر الدائم)
const findFolderUpwards = (startDir, folderName) => {
  let currentDir = startDir;
  while (currentDir !== path.parse(currentDir).root) {
    const targetPath = path.join(currentDir, folderName);
    if (fs.existsSync(targetPath)) return targetPath;
    currentDir = path.dirname(currentDir); 
  }
  return null;
};

const persistentUploadsPath = findFolderUpwards(__dirname, 'persistent_uploads') || path.join(__dirname, 'uploads');

if (!fs.existsSync(persistentUploadsPath)) {
  fs.mkdirSync(persistentUploadsPath, { recursive: true });
}

const allowedOrigins = [
  'http://localhost:3000', 
  'https://test.nopreahotel.com', 
  'https://nopreahotel.com', 
  'https://www.nopreahotel.com'
];

app.use(cors({
  origin: allowedOrigins,
  credentials: true
})); 

app.use(express.json()); 

app.use('/uploads', express.static(persistentUploadsPath)); 

// ❌ تم مسح راوت الـ Debugging (اللينك السري) من هنا أماناً للمشروع ❌

mongoose.connect(process.env.MONGODB_URI)
  .then(() => console.log('✅ Connected to MongoDB successfully! (noprea_db)'))
  .catch((err) => console.error('❌ Failed to connect to MongoDB:', err));

app.use('/api/auth', authRoutes);
app.use('/api/rooms', roomRoutes);
app.use('/api/upload', uploadRoutes);
app.use('/api/gallery', galleryRoutes);
app.use('/api/reviews', reviewRoutes);
app.use('/api/contact', contactRoutes);
app.use('/api/newsletter', newsletterRoutes);
app.use('/api/activity', activityRoutes);
app.use('/api/users', userRoutes);
app.use('/api/media', mediaRoutes);
app.use('/api/retreats', retreatRoutes);

app.get('/api/status', (req, res) => {
  res.json({ message: 'NOPREA Backend is 100% Complete! 🚀' });
});

app.listen(PORT, () => {
  console.log(`✅ Server is running on port ${PORT}`);
});