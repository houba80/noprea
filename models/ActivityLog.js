import mongoose from 'mongoose';

const activitySchema = new mongoose.Schema({
  username: { type: String, required: true },
  action: { type: String, required: true }, // مثلاً: "Added a new room", "Logged in"
  date: { type: Date, default: Date.now }
}, { timestamps: true });

export default mongoose.model('ActivityLog', activitySchema);