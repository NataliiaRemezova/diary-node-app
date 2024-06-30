import { Router } from 'express';
import userRoutes from "./userRoutes.js"
import entryRoutes from "./entryRoutes.js"
import habitRoutes from "./habitRoutes.js"
import streakRouter from './streakRoutes.js';

const router = Router()

router.use('/user', userRoutes);
router.use('/habit', habitRoutes);
router.use('/entry', entryRoutes);
router.use('/streak', streakRouter);
router.get('/home', (req, res) => res.send('Home'));

export default router;
