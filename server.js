import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import path from 'path';
import { fileURLToPath } from 'url';
import fs from 'fs';
import compression from 'compression';
import apicache from 'apicache';

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
app.set('trust proxy', 1);

app.use(compression()); 

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

const persistentUploadsPath = findFolderUpwards(__dirname, 'persistent_uploads') || path.join(__dirname, 'uploads');

if (!fs.existsSync(persistentUploadsPath)) {
  fs.mkdirSync(persistentUploadsPath, { recursive: true });
}

const allowedOrigins = [
  'http://localhost:3000', 
  'https://nopreahotel.com', 
  'https://www.nopreahotel.com'
];

app.use(cors({
  origin: allowedOrigins,
  credentials: true
})); 

app.use(express.json()); 

const staticOptions = {
  setHeaders: (res, path, stat) => {
    res.set('Access-Control-Allow-Origin', '*');
    res.set('Cross-Origin-Resource-Policy', 'cross-origin');
  }
};

app.use('/uploads', express.static(persistentUploadsPath, staticOptions)); 
app.use('/persistent_uploads', express.static(persistentUploadsPath, staticOptions));

mongoose.connect(process.env.MONGODB_URI)
  .then(() => console.log('✅ Connected to MongoDB successfully!'))
  .catch((err) => console.error('❌ Failed to connect to MongoDB:', err));

// 🟢 تفعيل الكاش لمدة 5 دقايق للزوار
const cache = apicache.middleware('5 minutes');

// 🟢 المراقب الذكي: بيمسح الكاش أوتوماتيك مع أي تعديل أو حذف أو إضافة من الأدمن
app.use((req, res, next) => {
  if (['POST', 'PUT', 'PATCH', 'DELETE'].includes(req.method)) {
    apicache.clear(); 
  }
  next();
});

// 🟢 الراوتس اللي عليها الكاش
app.use('/api/rooms', cache, roomRoutes);
app.use('/api/gallery', cache, galleryRoutes);
app.use('/api/reviews', cache, reviewRoutes);
app.use('/api/retreats', cache, retreatRoutes);

// الراوتس اللي محتاجة تكون Real-time دايماً من غير كاش
app.use('/api/media', mediaRoutes); 
app.use('/api/auth', authRoutes);
app.use('/api/contact', contactRoutes);
app.use('/api/newsletter', newsletterRoutes);
app.use('/api/activity', activityRoutes);
app.use('/api/users', userRoutes);
app.use('/api/upload', uploadRoutes);

app.get('/api/status', (req, res) => {
  res.json({ message: 'NOPREA Backend is 100% Complete with Smart Auto-Clearing Cache! 🚀' });
});

app.listen(PORT, () => {
  console.log(`✅ Server is running on port ${PORT}`);
});