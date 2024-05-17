import { Router } from 'express';
import entryRoutes from "./entryRoutes.js"
import habitRoutes from "./habitRoutes.js"

const router = Router()

router.use('/habit', habitRoutes);
router.use('/entry', entryRoutes);
router.get('/home', (req, res) => res.send('Home'));

export default router;
