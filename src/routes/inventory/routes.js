import express from 'express';
import { getAllCategory, getCategoryWithId, createCategory, updateCategory, deleteCategory } from '../../controllers/CategoryController.js';
import { getProductWithId, getAllProducts, createProduct, updateProduct, deleteProduct } from '../../controllers/ProductController.js';
import { authorize, protect } from '../../middlewares/AuthMiddleware.js';

const router = express.Router();

// Product

router.get('/products', getAllProducts);
router.get('/product/:id', getProductWithId);
router.post('/create-product', protect, authorize("user"), createProduct);
router.put('/update-product/:id', protect, authorize("user"), updateProduct);
router.delete('/delete-product/:id', protect, authorize("user"), deleteProduct);

// Category
router.get('/categories', getAllCategory);
router.get('/category/:id', getCategoryWithId);
router.post('/create-category', protect, authorize("user"), createCategory);
router.put('/update-category/:id', protect, authorize("user"), updateCategory);
router.delete('/delete-category/:id', protect, authorize("user"), deleteCategory);

export default router;