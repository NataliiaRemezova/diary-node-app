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

dotenv.config();
const app = express();

// Middleware
app.use(cors({
    origin: 'http://localhost:5173',
    credentials: true,
}));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());

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

// JWT Authentication Middleware
const authenticateJWT = async (req, res, next) => {
    const token = req.cookies.token;

    if (!token) {
        return res.status(401).json({ success: false, message: 'Access token missing or invalid' });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET || 'your_jwt_secret');
        const user = await User.findById(decoded.id).select('username email'); // Fetch user details

        if (!user) {
            return res.status(403).json({ success: false, message: 'User not found' });
        }

        req.user = user; // Attach user details to request object
        next();
    } catch (err) {
        return res.status(403).json({ success: false, message: 'Invalid token' });
    }
};

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
        console.log('Generated Token:', token);
        res.cookie('token', token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'strict',
        });
        console.log('Cookie Set:', res.get('Set-Cookie'));
        res.json({ success: true });
    })(req, res, next);
});

app.post('/api/logout', (req, res) => {
    res.clearCookie('token', { httpOnly: true, secure: process.env.NODE_ENV === 'production' });
    res.json({ success: true, message: 'Logged out successfully' });
});
app.get('/api/protected', authenticateJWT, (req, res) => {
    res.json({ success: true, message: 'This is a protected route', user: req.user });
});

app.get('/api/check-auth', authenticateJWT, (req, res) => {
    res.json({ success: true, authenticated: true, user: req.user });
});

app.use(express.static('../Frontend/build')); // For the future Vite build

app.use('/api', router);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));

export default app;