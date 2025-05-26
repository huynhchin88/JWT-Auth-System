const fs = require('fs');
const jwt = require('jsonwebtoken');

module.exports = function (req, res, next) {
    const token = req.header('x-auth-token');
    if (!token) return res.status(401).json({ message: 'No token, denied!' });

    try {
        const decoded = jwt.verify(token, fs.readFileSync('../private.key', 'utf8'));
        req.user = decoded.user;
        next();
    } catch (err) {
        res.status(401).json({ message: 'Token is NOT valid.' });
    }
};