import express from 'express';
import mongoose from 'mongoose';
import authRoutes from './routes/authRoutes.js'; 
import cors from 'cors';

mongoose.set('strictQuery', false);

const MONGO_URI = process.env.MONGO_URI || 'mongodb+srv://vladleurda02:Ad1qqzbYk6kzhm84@cluster0.cet0e.mongodb.net/my-clothing-store';
const PORT = process.env.PORT || 5000;

const app = express();

const connectDB = async (uri) => {
  try {
    console.log('Connecting to MongoDB...');
    await mongoose.connect(uri, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('MongoDB Connected');
  } catch (err) {
    console.error('Error connecting to MongoDB:', err.message);
    process.exit(1);
  }
};

connectDB(MONGO_URI);

app.use(express.json());
app.use(cors());
app.use('/api/auth', authRoutes); 

app.get('/', (req, res) => {
  res.send('Hello World!');
});


app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
