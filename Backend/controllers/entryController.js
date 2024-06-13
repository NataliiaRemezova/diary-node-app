import Entry from '../data/model/entryModel.js';
import User from '../data/model/userModel.js';

export const createEntry = async (req, res) => {
    const { text, date } = req.body;
    const userId = req.user.id; // Access user ID from the JWT token
    try {
        const newEntry = new Entry({ text, date, user: userId });
        await newEntry.save();

        // Find the user and update their list of entries
        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).send({ error: 'User not found' });
        }
        user.entries.push(newEntry._id);
        await user.save();

        res.status(201).send(newEntry);
    } catch (error) {
        res.status(400).send(error);
    }
};

export const getEntries = async (req, res) => {
    try {
        const userId = req.user.id;

        // Find entries that belong to the current user
        const entries = await Entry.find({ user: userId });

        res.send(entries);
    } catch (error) {
        res.status(500).send(error);
    }
};

export const getEntryById = async (req, res) => {
    try {
        const entry = await Entry.findById(req.params.id);
        if (!entry) {
            return res.status(404).send('Entry not found');
        }
        res.send(entry);
    } catch (error) {
        res.status(500).send(error);
    }
};

export const updateEntry = async (req, res) => {
    const { text } = req.body;
    try {
        const entry = await Entry.findByIdAndUpdate(req.params.id, { text }, { new: true });
        if (!entry) {
            return res.status(404).send('Entry not found');
        }
        res.send(entry);
    } catch (error) {
        res.status(400).send(error);
    }
};

export const deleteEntry = async (req, res) => {
    try {
        const entry = await Entry.findByIdAndDelete(req.params.id);
        if (!entry) {
            return res.status(404).send('Entry not found');
        }

        // Find the user and remove the entry ID from their entries array
        await User.findByIdAndUpdate(entry.user, { $pull: { entries: entry._id } });

        res.send(entry);
    } catch (error) {
        res.status(500).send(error);
    }
};
