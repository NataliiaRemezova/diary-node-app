import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import dotenv from 'dotenv';
import connectToDb from './data/connectToDb.js';
import router from './routes/index.js';

dotenv.config();
const app = express();

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Connect to MongoDB
connectToDb();

app.use(express.static('../Frontend/build')); // For the future Vite build

app.use('/api', router); 

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
