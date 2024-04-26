const { Router } = require('express');

const entryRouter = Router();

entryRouter.get('/create-entry', (req, res) => res.send('Create Entry'));
entryRouter.get('/update-entry', (req, res) => res.send('Update Entry'));
entryRouter.get('/delete-entry', (req, res) => res.send('Delete Entry'));

module.exports = entryRouter;