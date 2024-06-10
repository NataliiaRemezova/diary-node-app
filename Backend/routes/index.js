import { Router } from 'express';
import userRoutes from "./userRoutes.js"
import entryRoutes from "./entryRoutes.js"
import habitRoutes from "./habitRoutes.js"
import authenticateJWT from '../middleware/authenticateJWT.js';

const router = Router()

router.use('/user', userRoutes);
router.use('/habit', authenticateJWT, habitRoutes);
router.use('/entry', authenticateJWT, entryRoutes);
router.get('/home', (req, res) => res.send('Home'));

export default router;
