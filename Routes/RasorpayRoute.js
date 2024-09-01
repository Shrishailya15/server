const express = require('express');
const router = express.Router();
const razorpay = require('razorpay');
const crypto = require('crypto');
const Payment = require('../Model/Rasorpay');
const dotenv = require('dotenv');

dotenv.config();

// Initialize Razorpay
const instance = new razorpay({
  key_id: process.env.RAZORPAY_KEY_ID,
  key_secret: process.env.RAZORPAY_KEY_SECRET,
});

// Checkout API
router.post('/checkout', async (req, res) => {
  const options = {
    amount: Number(req.body.amount * 100), // amount in paise
    currency: 'INR',
    receipt: 'receipt#1',
  };

  try {
    const order = await instance.orders.create(options);
    res.status(200).json({
      success: true,
      order,
    });
  } catch (error) {
    console.error('Error creating order:', error);
    res.status(500).json({
      success: false,
      message: 'Error creating order',
    });
  }
});

// Payment Verification API
// Payment Verification API
router.post('/paymentverification', async (req, res) => {
  const { razorpay_order_id, razorpay_payment_id, razorpay_signature } = req.body;
  const body = `${razorpay_order_id}|${razorpay_payment_id}`;
  const expectedSignature = crypto
    .createHmac('sha256', process.env.RAZORPAY_KEY_SECRET)
    .update(body.toString())
    .digest('hex');

  if (expectedSignature === razorpay_signature) {
    try {
      await Payment.create({
        razorpay_order_id,
        razorpay_payment_id,
        razorpay_signature,
      });
      // Send a JSON response instead of a redirect for SPA handling
      res.status(200).json({ success: true, redirectUrl: `http://localhost:3000/paymentsuccess?reference=${razorpay_payment_id}` });
    } catch (error) {
      console.error('Error saving payment:', error);
      res.status(500).json({
        success: false,
        message: 'Error saving payment',
      });
    }
  } else {
    res.status(400).json({ success: false, message: 'Invalid signature' });
  }
});


// Get Razorpay Key
router.get('/getkey', (req, res) => {
  res.status(200).json({ key: process.env.RAZORPAY_KEY_ID });
});

module.exports = router;
