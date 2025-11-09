const mongoose = require('mongoose');

const OrderSchema = new mongoose.Schema({
  userId: { type: String, required: true },
  products: [{ productId: { type: mongoose.Schema.Types.ObjectId, ref: 'Product' }, quantity: Number }],
  paymentScreenshot: { type: String, required: true }, // path to uploaded image
  status: { type: String, default: 'Pending' }, // Pending, Confirmed, Rejected
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Order', OrderSchema);