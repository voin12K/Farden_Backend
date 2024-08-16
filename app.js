import express from 'express';
import connectDB from './config/db.js'; // Убедитесь, что импорт db.js правильный

const app = express();

// Подключаемся к базе данных
connectDB();

app.use(express.json());

app.get('/', (req, res) => {
  res.send('Hello, World!');
});

const PORT = 5000;
app.listen(PORT, (err) => {
  if (err) {
    console.error('Error starting the server:', err);
  } else {
    console.log(`Server running on http://localhost:${PORT}`);
  }
});
