const express = require('express');
const router = express.Router();
const Product = require('../models/Product');
const Category = require('../models/Category');

// GET all products with category names
router.get('/', async (req, res) => {
  try {
    const products = await Product.find().populate('category', 'name');
    res.json(products);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// POST add product (admin only)
router.post('/', async (req, res) => {
  const { name, description, price, category } = req.body;
  try {
    const cat = await Category.findById(category);
    if (!cat) return res.status(404).json({ message: 'Category not found' });

    const product = new Product({ name, description, price, category });
    await product.save();
    res.status(201).json(product);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// DELETE product
router.delete('/:id', async (req, res) => {
  try {
    await Product.findByIdAndDelete(req.params.id);
    res.json({ message: 'Product deleted' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;