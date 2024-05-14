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

router.get('/get-all-habits', getAllHabits);
router.get('/get-habit/:id', getHabit);
router.post('/create-habit', createHabit);
router.put('/update-habit/:id', updateHabit);
router.delete('/delete-habit/:id', deleteHabit);

export default habitRouter ;
