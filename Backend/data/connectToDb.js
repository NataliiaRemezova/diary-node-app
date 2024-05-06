import mongoose from 'mongoose';

const connectToDb = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URL || 'mongodb://127.0.0.1:27017/diary-node-app', {});
    console.log('MongoDB Connected');
  } catch (err) {
    console.log('Failed to connect to MongoDB', err);
  }
};

export default connectToDb;
