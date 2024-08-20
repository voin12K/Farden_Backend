import Product from '../models/Product.js';

export const addProduct = async (req, res) => {
  const { name, description, price, sale, category, size, gender, ageCategory, image } = req.body;

  try {
    const newProduct = new Product({
      name,
      description,
      price,
      sale,
      category,
      size,
      gender,
      ageCategory,
      image,
    });

    const savedProduct = await newProduct.save();
    res.status(201).json(savedProduct);
  } catch (error) {
    res.status(500).json({ msg: 'Server error', error: error.message });
  }
};
