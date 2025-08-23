const express = require('express');
const router = express.Router();
const Food = require('../models/food');

// Add new food item
router.post('/add', async (req, res) => {
  try {
    const food = new Food(req.body);
    await food.save();
    res.status(201).json({ success: true, food });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// Get all food items
router.get('/', async (req, res) => {
  try {
    const foods = await Food.find({});
    res.json(foods);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
