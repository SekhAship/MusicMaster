const express = require('express');
const router = express.Router();
const Order = require('../models/orderModel');
const verifyToken = require('../middleware/authMiddleware');

// ✅ Create Order (Protected)
router.post('/', verifyToken, async (req, res) => {
  try {
    const { items, totalAmount, address } = req.body;
    const userId = req.user.userId;

    if (!userId) return res.status(401).json({ message: 'Unauthorized' });
    if (!items || !Array.isArray(items) || items.length === 0) {
      return res.status(400).json({ message: 'Order must contain items' });
    }
    if (typeof totalAmount !== 'number' || totalAmount < 0) {
      return res.status(400).json({ message: 'Invalid total amount' });
    }
    if (!address || typeof address !== 'string' || address.trim() === '') {
      return res.status(400).json({ message: 'Address is required' });
    }

    for (const item of items) {
      if (!item.foodId || !item.name || typeof item.quantity !== 'number' || typeof item.price !== 'number') {
        return res.status(400).json({ message: 'Each item must have foodId, name, quantity, and price' });
      }
    }

    const order = new Order({
      userId,
      items,
      totalAmount,
      address,
    });

    const savedOrder = await order.save();
    res.status(201).json({ message: 'Order placed successfully', orderId: savedOrder._id });
  } catch (error) {
    console.error('❌ Order placement error:', error);
    res.status(500).json({ message: 'Failed to place order', error: error.message });
  }
});

// ✅ Get Orders for Logged-in User (Protected)
router.get('/', verifyToken, async (req, res) => {
  try {
    const userId = req.user.userId;
    const orders = await Order.find({ userId }).sort({ createdAt: -1 });
    res.status(200).json(orders);
  } catch (error) {
    console.error('❌ Order fetch error:', error);
    res.status(500).json({ message: 'Failed to fetch orders', error: error.message });
  }
});

module.exports = router;
