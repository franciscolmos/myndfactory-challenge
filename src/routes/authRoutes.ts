import { Router } from 'express';
import { login, register, refresh } from '../controllers/authController';

const router = Router();

// auth routes
router.post('/register', register); // create user
router.post('/login', login);       // login route
router.post('/refresh', refresh);   // refresh token route

export default router;