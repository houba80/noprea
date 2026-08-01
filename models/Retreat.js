import mongoose from 'mongoose';

const retreatSchema = new mongoose.Schema({
  name: { type: String, required: true }, 
  date: { type: String, required: true }, 
  startDate: { type: String }, 
  endDate: { type: String },   
  icon: { type: String, default: '🍃' }   
}, { timestamps: true });

export default mongoose.model('Retreat', retreatSchema);