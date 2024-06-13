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
      const newHabit = new Habit({ name, description });
      await newHabit.save();
      res.status(201).json(newHabit);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  };
  
  export const updateHabit = async (req, res) => {
    const { id } = req.params;
    const { name, description } = req.body;
    try {
      const habit = await Habit.findByIdAndUpdate(
        id,
        { name, description },
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
    const { id } = req.params;
    const { date, completed } = req.body;
  
    try {
      const habit = await Habit.findById(id);
      if (!habit) {
        return res.status(404).json({ message: 'Habit not found' });
      }
  
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
  