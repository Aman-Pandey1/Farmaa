import express from 'express';
import Product from '../models/Product.model.js';

const router = express.Router();

// Get all products
router.get('/', async (req, res) => {
  try {
    const { category, petType, search } = req.query;
    const query = { isActive: true };

    if (category) query.category = category;
    if (petType) query.petType = { $in: [petType, 'both'] };
    if (search) query.name = { $regex: search, $options: 'i' };

    const products = await Product.find(query).sort({ createdAt: -1 });
    res.json({ success: true, products });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// Get single product
router.get('/:id', async (req, res) => {
  try {
    const product = await Product.findById(req.params.id).populate('reviews.user', 'name email');
    if (!product) {
      return res.status(404).json({ success: false, message: 'Product not found' });
    }
    res.json({ success: true, product });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

export default router;


