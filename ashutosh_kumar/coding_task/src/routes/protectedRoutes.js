const express = require('express');
const authMiddleware = require('../middlewares/authMiddleware.js')
const router = express.Router();

// Example of a protected route
router.get('/protected', authMiddleware, (req, res) => {
    res.json({ message: 'This is a protected route', user: req.user });
});

module.exports = router;
