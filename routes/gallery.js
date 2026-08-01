import express from 'express';
import Gallery from '../models/Gallery.js';
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();

router.get('/', async (req, res) => {
  try {
    const galleries = await Gallery.find({});
    res.json(galleries);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.post('/', protect, async (req, res) => {
  try {
    const newGallery = await Gallery.create(req.body);
    res.status(201).json({ message: '✅ Gallery added!', gallery: newGallery });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

router.delete('/:id', protect, async (req, res) => {
  try {
    await Gallery.findByIdAndDelete(req.params.id);
    res.json({ message: '✅ Gallery deleted!' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.put('/:id', protect, async (req, res) => {
  try {
    const updatedGallery = await Gallery.findByIdAndUpdate(req.params.id, req.body, { returnDocument: 'after' });
    res.json({ message: '✅ Gallery updated!', gallery: updatedGallery });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

export default router;