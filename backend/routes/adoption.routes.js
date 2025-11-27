import express from 'express';
import { protect } from '../middleware/auth.middleware.js';
import Adoption from '../models/Adoption.model.js';

const router = express.Router();

// Create adoption request
router.post('/', protect, async (req, res) => {
  try {
    const adoption = await Adoption.create({ ...req.body, applicant: req.user.id });
    res.status(201).json({ success: true, adoption });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// Get adoption requests
router.get('/', async (req, res) => {
  try {
    const adoptions = await Adoption.find({ status: 'pending' })
      .populate('pet')
      .populate('applicant', 'name email')
      .sort({ createdAt: -1 });
    res.json({ success: true, adoptions });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

export default router;


