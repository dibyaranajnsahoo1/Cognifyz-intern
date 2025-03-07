const express = require('express');
const router = express.Router();
const User = require('../models/User');
const bcrypt = require('bcrypt');

// ✅ Show Register Page
router.get('/register', (req, res) => {
    res.render('register');
});

// ✅ Show Login Page
router.get('/login', (req, res) => {
    res.render('login');
});

// ✅ Show Dashboard (Only if logged in)
router.get('/dashboard', (req, res) => {
    if (!req.session.user) {
        return res.redirect('/login');
    }
    res.render('dashboard', { user: req.session.user });
});

// ✅ Handle Registration
router.post('/register', async (req, res) => {
    try {
        const { username, password } = req.body;
        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = new User({ username, password: hashedPassword });
        await newUser.save();
        res.redirect('/login');
    } catch (err) {
        res.status(500).send('Error registering user');
    }
});

// ✅ Handle Login
router.post('/login', async (req, res) => {
    try {
        const { username, password } = req.body;
        const user = await User.findOne({ username });
        if (!user) return res.status(400).send('User not found');

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) return res.status(401).send('Invalid credentials');

        req.session.user = user;
        res.redirect('/dashboard');
    } catch (err) {
        res.status(500).send('Error logging in');
    }
});

// ✅ Logout
router.get('/logout', (req, res) => {
    req.session.destroy(err => {
        if (err) return res.status(500).send('Logout failed');
        res.redirect('/login');
    });
});

module.exports = router;
