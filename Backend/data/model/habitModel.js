import mongoose from 'mongoose';

const HabitSchema = new mongoose.Schema({
  name: String,
  completions: [Boolean]
});

const Habit = mongoose.model('Habit', HabitSchema);
export default Habit;
