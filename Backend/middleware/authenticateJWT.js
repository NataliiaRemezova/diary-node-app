import jwt from 'jsonwebtoken';
import User from '../data/model/userModel.js';

const authenticateJWT = async (req, res, next) => {
    const token = req.cookies.token;

    if (!token) {
        return res.status(401).json({ success: false, message: 'Access token missing or invalid' });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET || 'your_jwt_secret');
        const user = await User.findById(decoded.id).select('username email');

        if (!user) {
            console.log("User not found for ID:", decoded.id);
            return res.status(403).json({ success: false, message: 'User not found' });
        }

        req.user = user;
        next();
    } catch (err) {
        console.error("JWT verification error:", err);
        return res.status(403).json({ success: false, message: 'Invalid token' });
    }
};

export default authenticateJWT;