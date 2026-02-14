const jwt = require('jsonwebtoken');

/* ================= AUTH MIDDLEWARE ================= */
const auth = (req, res, next) => {
    try {
        const token = req.header('Authorization');

        if (!token) {
            return res.status(401).json({ message: 'Access denied. No token provided.' });
        }

        const decoded = jwt.verify(
            token.replace('Bearer ', ''),
            process.env.JWT_SECRET || 'secretkey'
        );

        req.user = decoded;
        next();
    } catch (error) {
        return res.status(400).json({ message: 'Invalid token.' });
    }
};

/* ================= ROLE AUTHORIZATION ================= */
const authorizeRole = (role) => {
    return (req, res, next) => {
        if (!req.user || req.user.role !== role) {
            return res.status(403).json({
                message: 'Access denied. You do not have permission.'
            });
        }
        next();
    };
};

module.exports = { auth, authorizeRole };
