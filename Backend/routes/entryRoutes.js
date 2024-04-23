import { Router } from 'express';

const entryRouter = Router();

router.get('/create-entry', (req, res) => res.send('Create Entry'));
router.get('/update-entry', (req, res) => res.send('Update Entry'));
router.get('/delete-entry', (req, res) => res.send('Delete Entry'));

export default entryRouter;