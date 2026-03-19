import express from 'express';
import AuthRouter from './auth/routes.js';
import InventoryRouter from './inventory/routes.js';

const router = express.Router();

router.use('/', AuthRouter);
router.use('/', InventoryRouter);

export default router;