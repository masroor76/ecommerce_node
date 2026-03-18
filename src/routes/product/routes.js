import express from 'express';
import { createCategory, createProduct } from '../../controllers/InventoryController.js';
import { authorize, protect } from '../../middlewares/AuthMiddleware.js';

const router = express.Router();

router.post('/create-product', protect, authorize("admin"), createProduct);
router.post('/create-category', protect, authorize("admin"), createCategory);

export default router;