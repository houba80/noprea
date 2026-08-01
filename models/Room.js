import mongoose from 'mongoose';

const roomSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String, required: true },
  image: { type: String, required: true },
  extraImages: [{ type: String }],
  features: [{ type: String }], 
  type: { type: String, enum: ['room', 'suite'], required: true },
  view: { type: String, required: true },
  
  // 🟢 الحقول الجديدة بناءً على الـ Overview
  size: { type: String, default: '32 sqm' },
  occupancy: { type: String, default: 'Up to 2 Guests' },
  bedConfiguration: { type: String, default: '1 Queen & 1 Twin' },
  price: { type: Number, required: true }, // السعر الأساسي للغرفة
  
  priceInfo: { type: String },
  embedLink: { type: String } 
}, { timestamps: true });

export default mongoose.model('Room', roomSchema);