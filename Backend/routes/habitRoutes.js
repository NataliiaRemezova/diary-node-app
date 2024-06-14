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

/*
//sprint_07_matthis
habitRouter.get('/get-all-habits', authenticateJWT, getAllHabits);
habitRouter.get('/get-habit/:id', authenticateJWT, getHabit);
habitRouter.post('/create-habit', authenticateJWT, createHabit);
habitRouter.put('/update-habit/:id', authenticateJWT, updateHabit);
habitRouter.put('/update-habit-completion/:id/:index', authenticateJWT, updateHabitCompletion); // New route
habitRouter.delete('/delete-habit/:id', authenticateJWT, deleteHabit);
*/
habitRouter.get('/get-all-habits', getAllHabits);
habitRouter.get('/get-habit/:id', getHabit);
habitRouter.post('/create-habit', createHabit);
habitRouter.put('/update-habit/:id', updateHabit);
habitRouter.delete('/delete-habit/:id', deleteHabit);
habitRouter.put('/update-habit-completion/:id', updateHabitCompletion);

export default habitRouter;
