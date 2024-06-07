import express from 'express';
import {
  getAllHabits,
  getHabit,
  createHabit,
  updateHabit,
  deleteHabit,
  updateHabitCompletion
} from '../controllers/habitController.js';

const habitRouter = express.Router();

habitRouter.get('/get-all-habits', getAllHabits);
habitRouter.get('/get-habit/:id', getHabit);
habitRouter.post('/create-habit', createHabit);
habitRouter.put('/update-habit/:id', updateHabit);
habitRouter.delete('/delete-habit/:id', deleteHabit);
habitRouter.put('/update-habit-completion/:id', updateHabitCompletion);

export default habitRouter;
