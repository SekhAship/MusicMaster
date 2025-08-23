// controllers/orderController.js
const Order = require('../models/ordermodel');

const placeOrder = async (req, res) => {
  try {
    const newOrder = new Order(req.body);
    await newOrder.save();
    res.status(201).json({ message: 'Order placed successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Failed to place order', error });
  }
};

module.exports = { placeOrder };
// controllers/orderController.js
const Order = require('../models/ordermodel');

const placeOrder = async (req, res) => {
  try {
    const newOrder = new Order(req.body);
    await newOrder.save();
    res.status(201).json({ message: 'Order placed successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Failed to place order', error });
  }
};

module.exports = { placeOrder };
