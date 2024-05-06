import { Router } from 'express';
import { createEntry, getEntries, getEntryById, updateEntry, deleteEntry } from '../controllers/entryController.js';

const entryRouter = Router();

entryRouter.post('/create-entry', createEntry);
entryRouter.get('/get-entries', getEntries);
entryRouter.get('/get-entry/:id', getEntryById);
entryRouter.put('/update-entry/:id', updateEntry);
entryRouter.delete('/delete-entry/:id', deleteEntry);

export default entryRouter;
