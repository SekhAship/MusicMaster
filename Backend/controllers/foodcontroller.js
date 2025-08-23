const Food = require('../models/food');

const getAllFoods = async (req, res) => {
  try {
    const foods = await Food.find();
    res.json(foods);
  } catch (err) {
    res.status(500).json({ message: 'Error fetching food items' });
  }
};

module.exports = { getAllFoods };

