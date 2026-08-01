import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: { type: String, enum: ['superadmin', 'editor'], default: 'editor' },
  permissions: [{ type: String }] // ['rooms', 'gallery', 'reviews']
}, { timestamps: true });

export default mongoose.model('User', userSchema);