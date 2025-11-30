import express from 'express';
import { register, login, getMe, sendOTP, verifyOTP } from '../controllers/auth.controller.js';
import { protect } from '../middleware/auth.middleware.js';

const router = express.Router();

// Email/Password Auth
router.post('/register', register);
router.post('/login', login);

// Mobile/OTP Auth
router.post('/send-otp', sendOTP);
router.post('/verify-otp', verifyOTP);

// Protected Routes
router.get('/me', protect, getMe);

export default router;


