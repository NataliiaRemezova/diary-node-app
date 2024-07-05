import express from 'express';
import { createUser, getUsers, getUserById, updateUser, deleteUser, getUserProfile } from '../controllers/userController.js';
import authenticateJWT from '../middleware/authenticateJWT.js';

const userRouter = express.Router();

userRouter.post('/create-user', createUser);
userRouter.get('/get-users', getUsers);
userRouter.get('/get-user/:id', getUserById);
userRouter.put('/update-user/:id', authenticateJWT, updateUser);
userRouter.delete('/delete-user/:id', deleteUser);
userRouter.get('/profile', authenticateJWT, getUserProfile);

export default userRouter;
