const express = require('express');
const router = express.Router();
const { loginUser, registerUser: signupUser } = require('../controller/users')

/* GET users listing. */
// router.get('/', function(req, res, next) {
//   res.send('respond with a resource');
// });


router.post('/register', signupUser); // Signup User

router.post('/login', loginUser); // Login User

module.exports = router;
