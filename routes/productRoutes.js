import express from 'express';
import { addProduct } from '../controllers/productController.js';
import { adminMiddleware } from '../middleware/adminMiddleware.js';
import { authMiddleware } from '../middleware/authMiddleware.js';

const router = express.Router();

router.post('/add', authMiddleware, adminMiddleware, addProduct);

export default router;
