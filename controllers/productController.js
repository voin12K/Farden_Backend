import Product from '../models/Product.js';
import productService from '../services/productService.js';

export const addProduct = async (req, res) => {
  try {
    const { name, description, price, category, size, gender, ageCategory, image, stock, sale } = req.body;

    if (
      !name || 
      !description || 
      typeof price !== 'number' || 
      !category || 
      !size || 
      !gender || 
      !ageCategory || 
      !image || 
      typeof stock !== 'number'
    ) {
      return res.status(400).json({ message: 'All fields are required and must be of correct type.' });
    }

    const product = await productService.createProduct(req.body);

    res.status(201).json(product);
  } catch (error) {
    console.error('Error while adding the product:', error);
    res.status(500).json({ message: 'Server error while adding the product.' });
  }
};
