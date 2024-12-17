import { Router } from 'express';
import { getUsers, getUser, updateUser, deleteUser } from '../controllers/userController'
import { authMiddleware } from '../middlewares/authMiddleware';

const router = Router();

// user routes
router.get('/', getUsers);                          // get all users
router.get('/:id', getUser);                        // get user by id
router.put('/:id', authMiddleware, updateUser);     // update user (protected)
router.delete('/:id', authMiddleware, deleteUser);  // delete user (protected)

export default router;