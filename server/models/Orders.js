const mongoose = require('mongoose');

const OrderItemSchema = new mongoose.Schema({
  name: String,
  qty: Number,
  size: String,
  price: Number,
  img: String
});

const OrderSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true
  },
  order_data: [{
    Order_date: {
      type: String,
      required: true
    },
    items: [OrderItemSchema],
    totalCost: {
      type: Number,
      required: true
    }
  }]
});

module.exports = mongoose.model('Order', OrderSchema);