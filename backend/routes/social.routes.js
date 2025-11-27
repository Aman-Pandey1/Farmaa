import express from 'express';
import { protect } from '../middleware/auth.middleware.js';
import Post from '../models/Post.model.js';

const router = express.Router();

// Create post
router.post('/', protect, async (req, res) => {
  try {
    const post = await Post.create({ ...req.body, user: req.user.id });
    res.status(201).json({ success: true, post });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// Get all posts
router.get('/', async (req, res) => {
  try {
    const posts = await Post.find()
      .populate('user', 'name profileImage')
      .populate('pet')
      .populate('likes', 'name')
      .populate('comments.user', 'name profileImage')
      .sort({ createdAt: -1 });
    res.json({ success: true, posts });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// Like/Unlike post
router.put('/:id/like', protect, async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    const isLiked = post.likes.includes(req.user.id);
    
    if (isLiked) {
      post.likes = post.likes.filter(id => id.toString() !== req.user.id.toString());
    } else {
      post.likes.push(req.user.id);
    }
    
    await post.save();
    res.json({ success: true, post });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

export default router;


