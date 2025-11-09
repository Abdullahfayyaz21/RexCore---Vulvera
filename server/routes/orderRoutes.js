const express = require('express');
const router = express.Router();
const Order = require('../models/Order');
const upload = require('../middleware/upload');

// POST new order (user uploads screenshot)
router.post('/', upload.single('paymentScreenshot'), async (req, res) => {
  try {
    const { userId, products } = req.body;
    const paymentScreenshot = `/uploads/${req.file.filename}`;

    const order = new Order({
      userId,
      products: JSON.parse(products),
      paymentScreenshot
    });

    await order.save();
    res.status(201).json(order);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// GET all orders (for admin)
router.get('/', async (req, res) => {
  try {
    const orders = await Order.find().populate('products.productId', 'name price');
    res.json(orders);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// PATCH update order status (admin)
router.patch('/:id/status', async (req, res) => {
  const { status } = req.body;
  try {
    const order = await Order.findByIdAndUpdate(
      req.params.id,
      { status },
      { new: true }
    );
    res.json(order);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

module.exports = router;