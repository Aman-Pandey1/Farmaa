import express from 'express';
import { protect } from '../middleware/auth.middleware.js';
import CremationCenter from '../models/CremationCenter.model.js';
import CremationRequest from '../models/CremationRequest.model.js';

const router = express.Router();

// Seed a few centers if none exist (dev helper)
async function ensureSeedCenters() {
  const count = await CremationCenter.countDocuments();
  if (count > 0) return;
  await CremationCenter.insertMany([
    {
      name: 'Go Nirvana Foundation',
      address: 'Plot No 12, Near Main Road, Pratap Nagar',
      city: 'Jaipur',
      state: 'Rajasthan',
      phone: '1234567890',
    },
    {
      name: 'Rainbow Bridge Cremation',
      address: 'Sector 5, Malviya Nagar',
      city: 'Jaipur',
      state: 'Rajasthan',
      phone: '9876543210',
    },
  ]);
}

// Get cremation centers (by city optional)
router.get('/centers', async (req, res) => {
  try {
    await ensureSeedCenters();
    const { city } = req.query;
    const query = { isActive: true };
    if (city) query.city = String(city);
    const centers = await CremationCenter.find(query).sort({ createdAt: -1 });
    res.json({ success: true, centers });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// Create cremation request
router.post('/requests', protect, async (req, res) => {
  try {
    const request = await CremationRequest.create({
      ...req.body,
      user: req.user.id,
    });
    res.status(201).json({ success: true, request });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
});

// List my cremation requests
router.get('/requests/me', protect, async (req, res) => {
  try {
    const requests = await CremationRequest.find({ user: req.user.id })
      .populate('center')
      .sort({ createdAt: -1 });
    res.json({ success: true, requests });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

export default router;


