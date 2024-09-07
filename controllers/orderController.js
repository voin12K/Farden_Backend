import { createOrder } from '../services/orderService.js';

export const checkout = async (req, res) => {
  const { userId, productIds } = req.body;

  try {
    const order = await createOrder(userId, productIds);
    res.status(201).json({ message: 'Order created successfully', order });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
