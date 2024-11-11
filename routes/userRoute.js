const express = require('express');
const { registerUser, loginUser, getLoggedinUser } = require('../controllers/userController');
const auth = require('../middleware/auth');

const router = express.Router();


//register routes
router.post('/register', registerUser)

router.post('/getUser' ,getLoggedinUser)
//login routes
router.post('/login',loginUser)

module.exports = router;