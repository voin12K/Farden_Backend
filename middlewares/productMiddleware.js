import mongoose from 'mongoose';

function generateRandomSKU() {
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
  let result = '';
  for (let i = 0; i < 8; i++) {
    result += characters.charAt(Math.floor(Math.random() * characters.length));
  }
  return result;
}

const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  scu: {
    type: String,
    required: true,
    unique: true, 
  },
  description: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  sale: {
    type: Number,
  },
  category: {
    type: String,
    enum: ['shirts', 'hoodies', 'pants', 'shorts', 'headwear', 'underwear', 'dress', 't-shirts', 'jeans', 'sweatshirts', 'sweaters', 'sportswear', 'formal suits', 'underpants'],
    required: true,
  },
  size: {
    type: String,
    enum: ['XS', 'S', 'M', 'L', 'XL', 'XXL'],
    required: true,
  },
  gender: {
    type: String,
    enum: ['male', 'female', 'unisex'],
    required: true,
  },
  ageCategory: {
    type: String,
    enum: ['adult', 'child'],
    required: true,
  },
  image: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  stock: {
    type: Number,
    required: true,
    default: 0,
  },
});

productSchema.pre('save', async function (next) {
  if (this.isNew) { 
    let isUnique = false;
    while (!isUnique) {
      const randomSKU = generateRandomSKU();
      const existingProduct = await this.constructor.findOne({ scu: randomSKU });
      if (!existingProduct) {
        this.scu = randomSKU; 
        isUnique = true;
      }
    }
  }
  next();
});

const Product = mongoose.model('Product', productSchema);

export default Product;
