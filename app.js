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

const checkAuth = (req, res, next) => {
  const token = req.header('Authorization')?.split(' ')[1];
  if (!token) {
    return res.status(401).json({ message: 'No token, authorization denied' });
  }
  try {
    const decoded = jwt.verify(token, 'secret123');
    req.user = decoded;
    next();
  } catch (err) {
    res.status(401).json({ message: 'Token is not valid' });
  }
};

app.get('/auth/me', checkAuth, async (req, res) => {
  try {
    const user = await User.findOne({ email: req.user.email });
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.json({ user });
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err });
  }
});

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
