import Product from '../models/Product.js';

const createProduct = async (productData) => {
  const product = new Product(productData);
  await product.save();
  return product;
};

export default { createProduct };
