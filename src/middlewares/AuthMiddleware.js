import User from '../models/User.js';
import { VerifyJwt } from '../config/jwt/JwtToken.js';

export const protect = async (req, res, next) => {

    let token;

    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
        token = req.headers.authorization.split(' ')[1];
    }

    if (!token) {
        return res.status(401).json({ message: "Not authorized to access this route" });
    }

    try {
        const decoded = VerifyJwt(token);

        req.user = await User.findById(decoded.id);
        next();
    } catch (err) {
        return res.status(401).json({ message: "Token is invalid or expired" });
    }
};

export const authorize = (...roles) => {
    return (req, res, next) => {
        if (!roles.includes(req.user.role)) {
            return res.status(403).json({
                message: `User role ${req.user.role} is not authorized to access this route`
            });
        }
        next();
    };
};
