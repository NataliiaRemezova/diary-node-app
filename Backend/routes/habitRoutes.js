// server/routes/habitRoutes.js
import express from 'express';
import {
  getAllHabits,
  getHabit,
  createHabit,
  updateHabit,
  deleteHabit,
} from '../controllers/habitController.js';

const habitRouter = express.Router();

habitRouter.get('/get-all-habits', getAllHabits);
habitRouter.get('/get-habit/:id', getHabit);
habitRouter.post('/create-habit', createHabit);
habitRouter.put('/update-habit/:id', updateHabit);
habitRouter.delete('/delete-habit/:id', deleteHabit);

export default habitRouter;
