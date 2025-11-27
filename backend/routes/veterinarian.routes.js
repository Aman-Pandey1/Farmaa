import express from 'express';
import { protect } from '../middleware/auth.middleware.js';
import User from '../models/User.model.js';

const router = express.Router();

// Get all veterinarians
router.get('/', async (req, res) => {
  try {
    const veterinarians = await User.find({ 
      role: 'veterinarian',
      isActive: true 
    }).select('name email phone address profileImage');
    res.json({ success: true, veterinarians });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

export default router;


