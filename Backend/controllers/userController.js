import User from '../data/model/userModel.js';

export const createUser = async (req, res) => {
    const { name, email } = req.body;
    try {
        const newUser = new User({ name, email });
        await newUser.save();
        res.status(201).send(newUser);
    } catch (error) {
        res.status(400).send({error: error.message});
    }
};

export const getUsers = async (req, res) => {
    try {
        const users = await User.find().populate('entries').populate('habits');
        res.status(200).json(users);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
};

export const getUserById = async (req, res) => {
    try {
        const user = await User.findById(req.params.id).populate('entries').populate('habits');
        if (!user) {
            return res.status(404).send('User not found');
        }
        res.status(200).json(user);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

export const updateUser = async (req, res) => {
    const { id } = req.params;
    const { name, email, entries, habits } = req.body;
    try {
        const user = await User.findByIdAndUpdate(
            id,
            { name, email, entries, habits },
            { new: true }
        ).populate('entries').populate('habits');
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        res.status(200).json(user);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
  };

export const deleteUser = async (req, res) => {
    const { id } = req.params;
    try {
        const user = await User.findByIdAndDelete(id);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        res.status(200).json({ message: 'User deleted successfully' });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
  };