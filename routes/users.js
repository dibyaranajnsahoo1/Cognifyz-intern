const express = require('express');
const router = express.Router();
const User = require('../models/User');

// ✅ Get All Users (Admin View)
router.get('/', async (req, res) => {
    try {
        const users = await User.find();
        res.json(users);
    } catch (err) {
        res.status(500).send('Error fetching users');
    }
});

// ✅ Delete User (Admin)
router.delete('/:id', async (req, res) => {
    try {
        await User.findByIdAndDelete(req.params.id);
        res.send('User deleted');
    } catch (err) {
        res.status(500).send('Error deleting user');
    }
});

module.exports = router;
