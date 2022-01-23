const jwt = require ('jsonwebtoken')
const User = require('../models/userModel');
require('dotenv').config();


const authenticate = async (req, res,next) => {
    const accessToken = req.headers["access-token"];
        
    try {
        const { userId, exp } = await jwt.verify(accessToken, process.env.JWT_SECRET);

        // Check if token has expired
        if (exp < Date.now().valueOf() / 1000) {
            return res.status(401).json({
                error: "JWT token has expired, please login to obtain a new one"
            });
        }else{
            req.userID = userId;
            next();
        }
    } catch (error) {
        res.json({
            message: 'Authentication failed!'
        })
    }
}

module.exports = authenticate