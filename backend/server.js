import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import connectDB from './config/database.js';

// Import Routes
import authRoutes from './routes/auth.routes.js';
import userRoutes from './routes/user.routes.js';
import productRoutes from './routes/product.routes.js';
import orderRoutes from './routes/order.routes.js';
import trainingRoutes from './routes/training.routes.js';
import healthcareRoutes from './routes/healthcare.routes.js';
import bookingRoutes from './routes/booking.routes.js';
import adoptionRoutes from './routes/adoption.routes.js';
import emergencyRoutes from './routes/emergency.routes.js';
import socialRoutes from './routes/social.routes.js';
import serviceProviderRoutes from './routes/serviceProvider.routes.js';
import veterinarianRoutes from './routes/veterinarian.routes.js';
import adminRoutes from './routes/admin.routes.js';
import cremationRoutes from './routes/cremation.routes.js';
import petEventsRoutes from './routes/petEvents.routes.js';
import hopeRoutes from './routes/hope.routes.js';

dotenv.config();

const app = express();

// Middleware
app.use(cors({
  origin: '*', // Development - Production me specific origins use karein
  credentials: true,
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Database Connection
connectDB();

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes);
app.use('/api/products', productRoutes);
app.use('/api/orders', orderRoutes);
app.use('/api/training', trainingRoutes);
app.use('/api/healthcare', healthcareRoutes);
app.use('/api/bookings', bookingRoutes);
app.use('/api/adoption', adoptionRoutes);
app.use('/api/emergency', emergencyRoutes);
app.use('/api/social', socialRoutes);
app.use('/api/service-providers', serviceProviderRoutes);
app.use('/api/veterinarians', veterinarianRoutes);
app.use('/api/admin', adminRoutes);
app.use('/api/cremation', cremationRoutes);
app.use('/api/pet-events', petEventsRoutes);
app.use('/api/hope', hopeRoutes);

// Health Check
app.get('/api/health', (req, res) => {
  res.json({ status: 'OK', message: 'Furmaa API is running' });
});

// Error Handling Middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ 
    success: false, 
    message: 'Something went wrong!', 
    error: process.env.NODE_ENV === 'development' ? err.message : undefined 
  });
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`🚀 Server is running on port ${PORT}`);
});


