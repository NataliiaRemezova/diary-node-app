import mongoose from 'mongoose';

const HabitSchema = new mongoose.Schema({
  name: String,
  completions: [Boolean],
  user: {type: mongoose.Schema.Types.ObjectId, ref: "User"}
});

const Habit = mongoose.model('Habit', HabitSchema);
export default Habit;
