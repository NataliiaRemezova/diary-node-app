import express from 'express';
import { createEntry, getEntries, getEntryById, updateEntry, deleteEntry } from '../controllers/entryController.js';
import authenticateJWT from '../middleware/authenticateJWT.js';

const entryRouter = express.Router();

entryRouter.post('/create-entry', authenticateJWT, createEntry);
entryRouter.get('/get-entries', authenticateJWT, getEntries);
entryRouter.get('/get-entry/:id', authenticateJWT, getEntryById);
entryRouter.put('/update-entry/:id', authenticateJWT, updateEntry);
entryRouter.delete('/delete-entry/:id', authenticateJWT, deleteEntry);

export default entryRouter;
