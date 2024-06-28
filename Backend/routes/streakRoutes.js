import express from 'express';
import { getStreak } from '../controllers/streakController.js';
import authenticateJWT from '../middleware/authenticateJWT.js';

const streakRouter = express.Router();

streakRouter.get('/get-streak', authenticateJWT, getStreak);

export default streakRouter;
