import express from 'express';
import connectDB from './config/db.js';
import authRoutes from './routes/authRoutes.js';
import authMiddleware from './middlewares/authMiddleware.js'; 

const app = express();

connectDB();

app.use(express.json());

app.use('/api/auth', authRoutes);

app.get('/api/protected', authMiddleware, (req, res) => {
  res.json({ msg: 'Protected route accessed', userId: req.user });
});

app.get('/', (req, res) => {
  res.send('Hello, World!');
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, (err) => {
  if (err) {
    console.error('Error starting the server:', err);
  } else {
    console.log(`Server running on http://localhost:${PORT}`);
  }
});
