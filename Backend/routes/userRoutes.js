import express from 'express';
import { createUser, getUsers, getUserById, updateUser, deleteUser } from '../controllers/userController.js';

const router = express.Router();

router.post('/create-user', createUser);
router.get('/get-users', getUsers);
router.get('/get-user/:id', getUserById);
router.put('/update-user/:id', updateUser);
router.delete('/delete-user/:id', deleteUser);

export default router;
