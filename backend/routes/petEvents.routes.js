import express from 'express';
import PetEvent from '../models/PetEvent.model.js';

const router = express.Router();

async function ensureSeedEvents() {
  const count = await PetEvent.countDocuments();
  if (count > 0) return;
  await PetEvent.insertMany([
    {
      title: 'Jaipur Dog Show 2025',
      dateText: 'Sunday 15 February 2025',
      venue: 'Bharat Sanskar, Jaipur',
      city: 'Jaipur',
      description:
        'A fun community pet event with categories, prizes, and adoption awareness.',
    },
    {
      title: 'Paws & Play Fest',
      dateText: 'Saturday 08 March 2025',
      venue: 'Central Park',
      city: 'Jaipur',
      description: 'Games, grooming demos, stalls, and training sessions.',
    },
  ]);
}

// List events (city optional)
router.get('/', async (req, res) => {
  try {
    await ensureSeedEvents();
    const { city } = req.query;
    const query = { isActive: true };
    if (city) query.city = String(city);
    const events = await PetEvent.find(query).sort({ createdAt: -1 });
    res.json({ success: true, events });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// Get event detail
router.get('/:id', async (req, res) => {
  try {
    const event = await PetEvent.findById(req.params.id);
    if (!event) return res.status(404).json({ success: false, message: 'Event not found' });
    res.json({ success: true, event });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

export default router;


