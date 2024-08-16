import mongoose from 'mongoose';

const connectDB = async () => {
  try {
    console.log('Connecting to MongoDB...');
    await mongoose.connect('mongodb+srv://vladleurda02:Ad1qqzbYk6kzhm84@cluster0.cet0e.mongodb.net/my-clothing-store', {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('MongoDB Connected');
  } catch (err) {
    console.error('Error connecting to MongoDB:', err.message);
    process.exit(1);
  }
};

export default connectDB;
