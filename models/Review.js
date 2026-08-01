import mongoose from 'mongoose';

const reviewSchema = new mongoose.Schema({
  name: { type: String, required: true },
  country: { type: String, required: true },
  rating: { type: Number, required: true, default: 5 },
  quote: { type: String, required: true },
  source: { type: String, default: 'Booking.com' } // 👈 الحقل الجديد لمصدر التقييم
}, { timestamps: true });

export default mongoose.model('Review', reviewSchema);