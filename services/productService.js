import Product from '../models/Product.js';

const createProduct = async (productData) => {
  try {
    const product = new Product(productData);
    await product.save();
    return product;
  } catch (error) {
    console.error('Error creating product:', error.message);
    throw new Error('Error creating product');
  }
};

export default { createProduct };
