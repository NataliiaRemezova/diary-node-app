import express from 'express';
import authenticateJWT from '../middleware/authenticateJWT.js';
import {
    getAllHabits,
    getHabit,
    createHabit,
    updateHabit,
    updateHabitCompletion,
    deleteHabit,
} from '../controllers/habitController.js';

const habitRouter = express.Router();

habitRouter.get('/get-all-habits', authenticateJWT, getAllHabits);
habitRouter.get('/get-habit/:id', authenticateJWT, getHabit);
habitRouter.post('/create-habit', authenticateJWT, createHabit);
habitRouter.put('/update-habit/:id', authenticateJWT, updateHabit);
habitRouter.put('/update-habit-completion/:id/:index', authenticateJWT, updateHabitCompletion); // New route
habitRouter.delete('/delete-habit/:id', authenticateJWT, deleteHabit);

export default habitRouter;
