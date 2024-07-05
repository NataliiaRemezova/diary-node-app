import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();

const connectToDb = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URL || 'mongodb://diary_app_mongo:27017/diary-node-app', {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('MongoDB Connected');
  } catch (err) {
    console.log('Failed to connect to MongoDB', err);
  }
};

export default connectToDb;
