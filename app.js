import express from 'express';
import mongoose from 'mongoose';
import authRoutes from './routes/authRoutes.js';
import productRoutes from './routes/productRoutes.js';
import { authMiddleware, adminMiddleware } from './middlewares/authMiddleware.js';

const app = express();

const connectDB = async () => {
  try {
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

connectDB();

app.use(express.json());

app.use('/api/auth', authRoutes); 
app.use('/api/products', productRoutes); 

app.get('/admin', authMiddleware, adminMiddleware, (req, res) => {
  res.send('Welcome Admin!');
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
