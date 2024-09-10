import { createOrder } from '../services/orderService.js';

export const checkout = async (req, res) => {
  const { userId, productIds } = req.body;

  if (!userId || !productIds || !Array.isArray(productIds) || productIds.length === 0) {
    return res.status(400).json({ message: 'Invalid request data' });
  }

  try {
    const order = await createOrder(userId, productIds);
    res.status(201).json({ message: 'Order created successfully', order });
  } catch (error) {
    console.error('Order creation failed:', error);
    res.status(500).json({ message: error.message });
  }
};
