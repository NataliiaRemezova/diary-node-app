import { Router } from 'express';
import entryRoutes from "./entryRoutes.js"

const router = Router()

router.use('/entry', entryRoutes);
router.get('/home', (req, res) => res.send('Home'));

export default router;
