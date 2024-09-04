import Product from '../models/Product.js';
import productService from '../services/productService.js';

export const addProduct = async (req, res) => {
  try {
    const { name, description, price, category, size, gender, ageCategory, image, stock, sale } = req.body;

    if (!name || !description || !price || !category || !size || !gender || !ageCategory || !image || typeof stock === 'undefined') {
      return res.status(400).json({ message: 'All fields are required.' });
    }

    const product = await productService.createProduct(req.body);

    res.status(201).json(product);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error while adding the product.' });
  }
};
