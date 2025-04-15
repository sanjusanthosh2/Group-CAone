const express = require("express");
const router = express.Router();
const Order = require("../models/Orders");

router.post("/orderData", async (req, res) => {
  try {
    const { order_data, email, order_date } = req.body;

    if (!order_data || !email) {
      return res.status(400).json({ error: "Missing required fields: order_data or email" });
    }

    // Calculate total cost of the order
    const totalCost = order_data.reduce((sum, item) => sum + (item.price * item.qty), 0);

    // Process order items with all required fields
    const processedOrderData = order_data.map(item => ({
      name: item.name,
      qty: item.qty,
      size: item.size,
      price: item.price,
      img: item.img,  // Ensure img field is included
      totalCost: item.price * item.qty
    }));

    // Format the date string
    const formattedDate = new Date(order_date || new Date()).toLocaleString('en-US', {
      weekday: 'short',
      month: 'short',
      day: 'numeric',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
      hour12: true
    });

    const orderEntry = {
      Order_date: formattedDate,
      items: processedOrderData,
      totalCost: totalCost
    };

    let eId = await Order.findOne({ email });

    if (!eId) {
      await Order.create({
        email: email,
        order_data: [orderEntry]
      });
    } else {
      await Order.findOneAndUpdate(
        { email: email },
        { $push: { order_data: orderEntry } }
      );
    }

    res.status(200).json({ success: true });
  } catch (error) {
    console.error("Error saving order:", error);
    res.status(500).json({ error: "Server Error", message: error.message });
  }
});

router.post("/myOrderData", async (req, res) => {
  console.log("Fetching orders for:", req.body.email);
  
  try {
    let myData = await Order.findOne({ email: req.body.email });
    console.log("Fetched Data:", myData);

    if (!myData) {
      return res.status(404).json({ message: "No orders found for this email." });
    }

    // Sort orders by date in descending order (newest first)
    if (myData.order_data) {
      myData.order_data.sort((a, b) => new Date(b.Order_date) - new Date(a.Order_date));
    }

    res.json({ orderData: myData });

  } catch (error) {
    console.error("Error fetching order data:", error.message);
    res.status(500).json({ error: "Server Error", message: error.message });
  }
});

module.exports = router;