import express from 'express';
import { protect } from '../middleware/auth.middleware.js';
import User from '../models/User.model.js';

const router = express.Router();

// Get all service providers
router.get('/', async (req, res) => {
  try {
    const providers = await User.find({ 
      role: 'service_provider',
      isActive: true 
    }).select('name email phone address profileImage');
    res.json({ success: true, providers });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

export default router;


