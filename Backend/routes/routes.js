const express = require('express');
const router = express.Router();

// CRUD operation routes
router.get('/create-entry', (req, res) => res.send('Create Entry'));
router.get('/update-entry', (req, res) => res.send('Update Entry'));
router.get('/delete-entry', (req, res) => res.send('Delete Entry'));

module.exports = router;
