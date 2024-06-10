import jwt from 'jsonwebtoken';

const authenticateJWT = (req, res, next) => {
    const token = req.cookies && req.cookies.token; // Ensure req.cookies is defined

    console.log("Token: "+token);

    if (token) {
        jwt.verify(token, process.env.JWT_SECRET || 'your_jwt_secret', (err, user) => {
            if (err) {
                return res.sendStatus(403); // Forbidden
            }

            req.user = user; // Attach the user information to the request object
            next(); // Proceed to the next middleware/route handler
        });
    } else {
        res.sendStatus(401); // Unauthorized
    }
};

export default authenticateJWT;