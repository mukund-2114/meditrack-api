const express = require('express');
const { registerUser, loginUser } = require('../controllers/userController');

const router = express.Router();


//register routes
router.post('/register', registerUser)


//login routes
router.post('/login',loginUser)

module.exports = router;