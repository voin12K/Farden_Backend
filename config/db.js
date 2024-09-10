import mongoose from 'mongoose';
import config from './config.js';

const connectDB = async () => {
  try {
    console.log('Connecting to MongoDB...');
    await mongoose.connect(config.MONGO_URI);
    console.log('MongoDB Connected');
  } catch (err) {
    console.error('Error connecting to MongoDB:', err.message);
    process.exit(1);
  }
};

export default connectDB;
