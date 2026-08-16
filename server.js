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

// 🟢 لوجيك قاطع لتحديد مسار الصور الدائم (بيفحص الهارد ديسك بجد)
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// احتمالات مسار Hostinger (حسب السيرفر قاري الـ Symlink ولا المسار الحقيقي)
const hostingerPath1 = path.join(__dirname, '../../../persistent_uploads'); 
const hostingerPath2 = path.join(__dirname, '../../persistent_uploads');

let persistentUploadsPath = path.join(__dirname, 'uploads'); // مسار اللوكال الافتراضي

if (fs.existsSync(hostingerPath1)) {
  persistentUploadsPath = hostingerPath1;
} else if (fs.existsSync(hostingerPath2)) {
  persistentUploadsPath = hostingerPath2;
} else if (!fs.existsSync(persistentUploadsPath)) {
  fs.mkdirSync(persistentUploadsPath, { recursive: true }); // لو لوكال نكريته
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

// 🟢 توجيه أي طلب للصور للفولدر الصح اللي السيرفر لقاه
app.use('/uploads', express.static(persistentUploadsPath)); 

mongoose.connect(process.env.MONGODB_URI)
  .then(() => console.log('✅ Connected to MongoDB successfully! (noprea_db)'))
  .catch((err) => console.error('❌ Failed to connect to MongoDB:', err));

// ربط كل مسارات المشروع
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