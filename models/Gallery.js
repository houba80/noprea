import mongoose from 'mongoose';

const gallerySchema = new mongoose.Schema({
  title: { type: String, required: true }, // اسم الألبوم
  description: { type: String },
  coverImage: { type: String, required: true },
  images: [{
    src: { type: String, required: true }, // رابط الصورة
    title: { type: String }
  }]
}, { timestamps: true });

export default mongoose.model('Gallery', gallerySchema);