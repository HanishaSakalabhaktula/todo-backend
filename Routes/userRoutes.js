const express = require('express');
const router = express.Router();

const user = require('../Models/userModel');

const {
    authenticateUser,
    createUser,
    logoutUser
} = require('../Controlers/userControls');

router.post('/login', authenticateUser);
router.post('/signup', createUser);
router.get('/logout', logoutUser);
module.exports = router;