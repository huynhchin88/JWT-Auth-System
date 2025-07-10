const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const fs = require('fs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const auth = require('../middleware/auth');
const path = require('path');

// Register
router.post('/register', async (req, res) => {
    const { email, password } = req.body;
    try {
        let user = await User.findOne({ email });
        if (user) return res.status(400).json({ message: 'User already existed.' });

        user = new User({ email, password });
        const salt = await bcrypt.genSalt(10);
        user.password = await bcrypt.hash(password, salt);
        await user.save();

        const payload = { user: { id: user.id } };
        const privateKey = fs.readFileSync(path.join(__dirname, '../../private.key'), 'utf8');
        const token = jwt.sign(payload, privateKey, { expiresIn: '1h', algorithm: 'RS256' });
        res.json({ token });
    } catch (err) {
        console.error("err = ", err.message);
        res.status(500).send('Server error - register!');
    }
});

// Login
router.post('/login', async (req, res) => {
    const { email, password } = req.body;
    try {
        let user = await User.findOne({ email });
        if (!user) return res.status(400).json({ message: 'Invalid User.' });

        const passwordMatch = await bcrypt.compare(password, user.password);
        if (!passwordMatch) return res.status(400).json({ message: 'Invalid password.' });

        const payload = { user: { id: user.id } };
        const privateKey = fs.readFileSync(path.join(__dirname, '../../private.key'), 'utf8');
        const token = jwt.sign(payload, privateKey, { expiresIn: '1h', algorithm: 'RS256' });
        res.json({ token });
    } catch (err) {
        console.error("err = ", err.message);
        res.status(500).send('Server error - login!');
    }
});

// Protected Route
router.get('/me', auth, async (req, res) => {
    try {
        const user = await User.findById(req.user.id).select('-password');
        res.json(user);
    } catch (err) {
        res.status(500).send('Server error.');
    }
});

module.exports = router;