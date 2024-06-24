import express from 'express';
import authenticateJWT from '../middleware/authenticateJWT.js';
import {
  getAllHabits,
  getHabit,
  createHabit,
  updateHabit,
  deleteHabit,
  updateHabitCompletion
} from '../controllers/habitController.js';

const habitRouter = express.Router();

habitRouter.get('/get-all-habits', authenticateJWT, getAllHabits);
habitRouter.get('/get-habit/:id', authenticateJWT, getHabit);
habitRouter.post('/create-habit', authenticateJWT, createHabit);
habitRouter.put('/update-habit/:id', authenticateJWT, updateHabit);
habitRouter.put('/update-habit-completion/:id', authenticateJWT, updateHabitCompletion);
habitRouter.delete('/delete-habit/:id', authenticateJWT, deleteHabit);

export default habitRouter;
