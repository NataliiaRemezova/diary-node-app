import mongoose from 'mongoose';

const EntrySchema = new mongoose.Schema({
  text: {
    type: String,
    required: true
  },
  date: {
    type: String,
    required: true
  },
  user: {type: mongoose.Schema.Types.ObjectId, ref: "User"}
});

export default mongoose.model('Entry', EntrySchema);