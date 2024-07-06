import express from 'express';
import authenticateJWT from '../middleware/authenticateJWT.js';
import {
  getAllTodos,
  getTodo,
  createTodo,
  updateTodo,
  deleteTodo
} from '../controllers/todolistController.js';

const todolistRouter = express.Router();

todolistRouter.get('/get-all-todos', authenticateJWT, getAllTodos);
todolistRouter.get('/get-todo/:id', authenticateJWT, getTodo);
todolistRouter.post('/create-todo', authenticateJWT, createTodo);
todolistRouter.put('/update-todo/:id', authenticateJWT, updateTodo);
todolistRouter.delete('/delete-todo/:id', authenticateJWT, deleteTodo);

export default todolistRouter;
