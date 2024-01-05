const { check, validationResult } = require("validator");
const { userAuth: User } = require("../models/auth");

function ValidateUserEmail (req, res, next) {
    // Get token from header
    const token = req.cookies.jwt;

    // Check if not token
    if (!token) {
        return res.status(401).json({ msg: 'No token, authorization denied' });
    }

    // Verify token
    try {
        jwt.verify(token, process.env.SECRET_KEY, (error, decoded) => {
            if (error) {
                return res.status(401).json({ msg: 'Token is not valid' });
            } else {
                req.user_id = decoded.id;
                next();
            }
        });
    } catch (err) {
        console.error('Auth Middleware Error -- Server Error');
        res.status(500).json({ msg: 'Server Error' });
    }
}

module.exports = {
    ValidateUserEmail
}