import { Router } from 'express';
import entryRoutes from "./entryRoutes"

const router = Router()

router.use('/entry', entryRoutes);
router.get('/home', (req, res) => res.send('Home'));

module.exports = router;
