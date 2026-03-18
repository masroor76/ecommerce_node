import express from 'express';
import AuthRouter from './auth/routes.js';
import InventoryRouter from './product/routes.js';

const router = express.Router();

router.use('/', AuthRouter);
router.use('/', InventoryRouter);

export default router;