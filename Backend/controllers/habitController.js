import Habit from '../data/model/habitModel.js';

export const getAllHabits = async (req, res) => {
    try {
        const habits = await Habit.find();
        res.json(habits);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const getHabit = async (req, res) => {
    const { id } = req.params;
    try {
        const habit = await Habit.findById(id);
        if (!habit) return res.status(404).json({ message: 'Habit not found' });
        res.json(habit);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const createHabit = async (req, res) => {
    const { name, description } = req.body;
    try {
        const newHabit = new Habit({ name, description, completions: Array(7).fill(false) });
        await newHabit.save();
        res.status(201).json(newHabit);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const updateHabit = async (req, res) => {
    const { id } = req.params;
    const { name, description, completions } = req.body;
    try {
        const habit = await Habit.findByIdAndUpdate(
            id,
            { name, description, completions },
            { new: true }
        );
        res.json(habit);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const deleteHabit = async (req, res) => {
    const { id } = req.params;
    try {
        await Habit.findByIdAndDelete(id);
        res.json({ message: 'Habit deleted' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const updateHabitCompletion = async (req, res) => {
    const { id, index } = req.params;
    try {
        const habit = await Habit.findById(id);
        if (!habit) {
            return res.status(404).json({ message: 'Habit not found' });
        }
        habit.completions[index] = !habit.completions[index];
        await habit.save();
        res.json(habit);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
