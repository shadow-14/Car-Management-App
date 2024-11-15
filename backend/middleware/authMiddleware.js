const jwt = require('jsonwebtoken');
const User = require('../models/User');
require("dotenv").config();

const protect = async (req, res, next) => {
    let token;

    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
        try {
            token = req.headers.authorization.split(' ')[1];  // Extract token from Bearer token

            // Decode the token and find the user based on the decoded ID
            const decoded = jwt.verify(token, process.env.JWT_SECRET);

            // Attach user to the request object (req.user)
            req.user = await User.findById(decoded.id).select('-password');
            next();  // Continue to the next middleware or route handler
        } catch (error) {
            res.status(401).json({ message: 'Not authorized, token failed' });
        }
    } else {
        res.status(401).json({ message: 'Not authorized, no token' });  // Handle the case where token is not provided
    }
};

module.exports = { protect };
