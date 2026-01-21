import  jwt  from "jsonwebtoken";
import UserModel from "../modules/user/user.model.js";
import { config } from "../config/index.js";

const authUserChecking = async (req, res, next) => {
    let token;

    // Header check (Authorization: Bearer <token>)
    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
        try {
            token = req.headers.authorization.split(' ')[1];

            // Token decode 
            const decoded = jwt.verify(token, config.jwtSecret);

            // User find without password and request object set 
            req.user = await UserModel.findById(decoded.id).select('-password');

            next(); // next step
        } catch (error) {
            res.status(401).json({ message: 'Not authorized, token failed' });
        }
    }

    if (!token) {
        res.status(401).json({ message: 'No token, authorization denied' });
    }
};

// Admin Role Checking  middleware
const authAdminChecking = (req, res, next) => {
    if (req.user && req.user.role === 'admin') {
        next();
    } else {
        res.status(403).json({ message: 'Not authorized as an admin' });
    }
};

export const authMiddleware = {
    authUserChecking,
    authAdminChecking
}