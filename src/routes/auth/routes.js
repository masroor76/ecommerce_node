import express from 'express';
import { loginUser, createUser, getAllUsers } from '../../controllers/AuthController.js';
import { authorize, protect } from '../../middlewares/AuthMiddleware.js';

const router = express.Router();

router.get("/user-list", protect, authorize("user"), getAllUsers);

router.post('/register', createUser);
router.post('/login', loginUser);

export default router;