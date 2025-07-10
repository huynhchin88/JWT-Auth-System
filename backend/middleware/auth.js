const fs = require('fs');
const jwt = require('jsonwebtoken');
const path = require('path');

module.exports = function (req, res, next) {
    const token = req.header('x-auth-token');
    if (!token) return res.status(401).json({ message: 'No token, denied!' });

    try {
        const publicKey = fs.readFileSync(path.join(__dirname, '../../public.key'), 'utf8');
        const decoded = jwt.verify(token, publicKey, { algorithms: ['RS256'] });
        req.user = decoded.user;
        next();
    } catch (err) {
        res.status(401).json({ message: 'Token is NOT valid.' });
        console.error(err.message);
    }
};