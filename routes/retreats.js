import express from 'express';
import Retreat from '../models/Retreat.js';
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();

router.get('/', async (req, res) => {
  try {
    const retreats = await Retreat.find().sort({ createdAt: 1 });
    res.json(retreats);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.post('/', protect, async (req, res) => {
  try {
    const retreat = await Retreat.create(req.body);
    res.status(201).json(retreat);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// 🟢 التعديل هنا: استخدمنا returnDocument: 'after' عشان نلغي تحذير التيرمينال
router.put('/:id', protect, async (req, res) => {
  try {
    const updatedRetreat = await Retreat.findByIdAndUpdate(
      req.params.id, 
      req.body, 
      { returnDocument: 'after', runValidators: true } 
    );
    res.json(updatedRetreat);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

router.delete('/:id', protect, async (req, res) => {
  try {
    await Retreat.findByIdAndDelete(req.params.id);
    res.json({ message: 'Retreat deleted' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

export default router;