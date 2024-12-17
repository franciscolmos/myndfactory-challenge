const express = require('express');
const router = express.Router();
const { createUser, getUsers, getUserById, updateUser, deleteUser } = require('../controllers/userController');
const authMiddleware = require('../middlewares/authMiddleware');

// user routes
router.post('/', authMiddleware, createUser);  // create user
router.post('/auth/login')
router.get('/', getUsers);                    // get all users
router.get('/:id', getUserById);              // get user by id
router.put('/:id', authMiddleware, updateUser); // update user
router.delete('/:id', authMiddleware, deleteUser); // delete user

module.exports = router;
