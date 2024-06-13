import mongoose from 'mongoose';

const completionSchema = new mongoose.Schema({
  date: { type: Date, required: true },
  completed: { type: Boolean, required: true, default: false }
});

const habitSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String },
  completions: [completionSchema],
  // user: {type: mongoose.Schema.Types.ObjectId, ref: "User"}
});

const Habit = mongoose.model('Habit', habitSchema);

export default Habit;
