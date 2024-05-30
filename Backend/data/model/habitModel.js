import mongoose from 'mongoose';

const completionSchema = new mongoose.Schema({
    date: {
        type: Date,
        required: true
    },
    completed: {
        type: Boolean,
        required: true
    }
});

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
        type: [completionSchema],
        default: []
    }
});

const Habit = mongoose.model('Habit', habitSchema);

export default Habit;
