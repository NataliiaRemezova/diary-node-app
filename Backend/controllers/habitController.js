import Habit from '../data/model/habitModel.js';
import User from '../data/model/userModel.js';

export const getAllHabits = async (req, res) => {
  try {
    const userId = req.user.id;
    const habits = await Habit.find({ user: userId });
    res.json(habits);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getHabit = async (req, res) => {
  const { id } = req.params;
  try {
    const habit = await Habit.findById(id).where({ user: req.user.id });
    if (!habit) return res.status(404).json({ message: 'Habit not found' });
    res.json(habit);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const createHabit = async (req, res) => {
  const { name, description, startDate, endDate } = req.body;
  const userId = req.user.id;
  try {
    const newHabit = new Habit({ name, description, startDate, endDate, user: userId });
    await newHabit.save();

    const user = await User.findById(userId);
    user.habits.push(newHabit._id);
    await user.save();

    res.status(201).json(newHabit);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const updateHabit = async (req, res) => {
  const { id } = req.params;
  const { name, description, startDate, endDate } = req.body;
  try {
    const habit = await Habit.findByIdAndUpdate(
      id,
      { name, description, startDate, endDate },
      { new: true }
    ).where({ user: req.user.id });
    if (!habit) return res.status(404).json({ message: 'Habit not found' });
    res.json(habit);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const deleteHabit = async (req, res) => {
  const { id } = req.params;
  try {
    const habit = await Habit.findByIdAndDelete(id).where({ user: req.user.id });
    if (!habit) return res.status(404).json({ message: 'Habit not found' });

    await User.findByIdAndUpdate(req.user.id, { $pull: { habits: habit._id } });
    res.json({ message: 'Habit deleted' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const updateHabitCompletion = async (req, res) => {
  const { id } = req.params;
  const { date, completed } = req.body;

  try {
    const habit = await Habit.findById(id).where({ user: req.user.id });
    if (!habit) return res.status(404).json({ message: 'Habit not found' });

    const completion = habit.completions.find(c => c.date.toISOString() === new Date(date).toISOString());
    if (completion) {
      completion.completed = completed;
    } else {
      habit.completions.push({ date, completed });
    }

    await habit.save();
    res.json(habit);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
