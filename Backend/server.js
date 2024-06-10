import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import dotenv from 'dotenv';
import session from 'express-session';
import passport from 'passport';
import jwt from 'jsonwebtoken';
import connectToDb from './data/connectToDb.js';
import router from './routes/index.js';
import User from './data/model/userModel.js';
import cookieParser from 'cookie-parser';

dotenv.config();  // Load environment variables
const app = express();

app.use(cookieParser());

/*
const authenticateJWT = (req, res, next) => {
    const token = req.cookies.token;

    console.log(token);

    if (token) {
        jwt.verify(token, process.env.JWT_SECRET || 'your_jwt_secret', (err, user) => {
            if (err) {
                return res.sendStatus(403);
            }

            req.user = user;
            next();
        });
    } else {
        res.sendStatus(401);
    }
};
*/

// Middleware
app.use(cors({
    origin: 'http://localhost:5173', // Replace with your frontend URL
    credentials: true
}));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// Connect to MongoDB
connectToDb();

// Session setup
app.use(session({
    secret: process.env.SESSION_SECRET || 'your_secret_key',
    resave: false,
    saveUninitialized: true
}));

// Passport setup
app.use(passport.initialize());
app.use(passport.session());

passport.use(User.createStrategy());
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

// Routes
app.post('/api/register', async (req, res) => {
    const { username, email, password } = req.body;
    try {
        await User.register(new User({ username, email }), password);
        res.status(201).json({ success: true, message: 'User registered successfully' });
    } catch (err) {
        res.status(400).json({ success: false, message: 'Error registering user', error: err.message });
    }
});

app.post('/api/login', (req, res, next) => {
    passport.authenticate('local', (err, user, info) => {
        if (err) return next(err);
        if (!user) {
            return res.status(400).json({ success: false, message: info.message });
        }

        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET || 'your_jwt_secret', { expiresIn: '1h' });
        cookies.set('token', token, { httpOnly: true });
        
        res.json({ success: true });
    })(req, res, next);
});

app.use(express.static('../Frontend/build')); // For the future Vite build

app.use('/api', router);


const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));

export default app;