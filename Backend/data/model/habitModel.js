import mongoose from 'mongoose';

const completionSchema = new mongoose.Schema({
  date: { type: Date, required: true },
  completed: { type: Boolean, required: true, default: false }
});

const habitSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String },
  startDate: { type: Date, required: true },
  endDate: { type: Date, required: true },
  completions: [completionSchema],
});

const Habit = mongoose.model('Habit', habitSchema);

export default Habit;
