import Entry from '../data/model/entryModel.js';

export const createEntry = async (req, res) => {
    const { text, date } = req.body;
    try {
        const newEntry = new Entry({ text, date });
        await newEntry.save();
        res.status(201).send(newEntry);
    } catch (error) {
        res.status(400).send(error);
    }
};

export const getEntries = async (req, res) => {
    try {
        const entries = await Entry.find();
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
        res.send(entry);
    } catch (error) {
        res.status(500).send(error);
    }
};
