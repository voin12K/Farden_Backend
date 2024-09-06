import Order from '../models/Order.js';
import Product from '../models/Product.js';
import User from '../models/User.js';

export const createOrder = async (userId, productIds) => {
  try {
    const user = await User.findById(userId);
    if (!user) throw new Error('User not found');

    let totalAmount = 0;
    const products = await Promise.all(
      productIds.map(async (id) => {
        const product = await Product.findById(id.product);
        if (!product) throw new Error(`Product not found: ${id.product}`);
        if (product.stock < id.quantity) throw new Error(`Insufficient stock for product: ${product.name}`);

        totalAmount += product.price * id.quantity;
        return { product, quantity: id.quantity };
      })
    );

    const order = new Order({
      user: user._id,
      products: products.map((p) => ({ product: p.product._id, quantity: p.quantity })),
      totalAmount,
    });

    await order.save();

    await Promise.all(
      products.map(async ({ product, quantity }) => {
        product.stock -= quantity;
        await product.save();
      })
    );

    return order;
  } catch (error) {
    throw new Error(error.message);
  }
};
