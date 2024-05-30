import mongoose from 'mongoose';

const habitSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    completions: {
        type: [Boolean],
        default: Array(7).fill(false)
    }
});

const Habit = mongoose.model('Habit', habitSchema);

export default Habit;
