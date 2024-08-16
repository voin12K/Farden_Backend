import mongoose from 'mongoose';

const MONGO_URI = 'mongodb+srv://vladleurda02:Ad1qqzbYk6kzhm84@cluster0.cet0e.mongodb.net/?retryWrites=true&w=majority';

const connectDB = async () => {
  console.log('Connecting to MongoDB...');
  try {
    await mongoose.connect(MONGO_URI);
    console.log('MongoDB Connected');
  } catch (err) {
    console.error('Error connecting to MongoDB:', err);
    process.exit(1);
  }
};

export default connectDB;
