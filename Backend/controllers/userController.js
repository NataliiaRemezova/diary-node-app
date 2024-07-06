import User from '../data/model/userModel.js';
import Entry from '../data/model/entryModel.js';
import Habit from '../data/model/habitModel.js';
import Todo from '../data/model/todoModel.js';
import bcrypt from 'bcrypt';

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
        const users = await User.find().populate('entries').populate('habits').populate('todos');
        res.status(200).json(users);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

export const getUserById = async (req, res) => {
    try {
        console.log('Fetching user with ID:', req.params.id);
        const user = await User.findById(req.params.id).populate('entries').populate('habits').populate('todos');
        console.log('User found:', user);
        if (!user) {
            return res.status(404).send('User not found');
        }
        res.status(200).json(user);
    } catch (error) {
        console.error('Error fetching user:', error);
        res.status(400).json({ error: error.message });
    }
};

export const updateUser = async (req, res) => {
    const { id } = req.params;
    const { username, currentPassword, newPassword } = req.body;

    try {
        const user = await User.findByIdAndUpdate(
            id,
            { name, email, entries, habits },
            { new: true }
        ).populate('entries').populate('habits').populate('todos');
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        const isMatch = await user.authenticate(currentPassword);
        if (!isMatch) {
            return res.status(400).json({ message: 'Incorrect current password' });
        }

        if (username) {
            user.username = username;
        }
        if (newPassword) {
            user.setPassword(newPassword, async (err) => {
                if (err) {
                    return res.status(400).json({ message: 'Error updating password' });
                }
                await user.save();
                res.status(200).json(user);
            });
        } else {
            await user.save();
            res.status(200).json(user);
        }
    } catch (error) {
        console.error('Error updating user:', error);
        res.status(400).json({ message: error.message });
    }
};

export const deleteUser = async (req, res) => {
    const { id } = req.params;

    try {
        // Find the user by ID
        const user = await User.findById(id);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        // Delete all entries associated with the user
        await Entry.deleteMany({ user: id });

        // Delete all habits associated with the user
        await Habit.deleteMany({ user: id });

        // Finally, delete the user
        await User.findByIdAndDelete(id);

        res.status(200).json({ message: 'User deleted successfully' });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

export const getUserProfile = async (req, res) => {
    try {
        if (!req.user) {
            return res.status(401).json({ message: "Unauthorized" });
        }
        const user = await User.findById(req.user._id).select('-password');
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }
        res.status(200).json(user);
    } catch (error) {
        console.error('Error fetching user profile:', error);
        res.status(500).json({ message: "Server error" });
    }
};
