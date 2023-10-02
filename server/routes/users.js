const express = require('express');
const router = express.Router();
const { loginUser, signupUser } = require('../controller/users')

/* GET users listing. */
// router.get('/', function(req, res, next) {
//   res.send('respond with a resource');
// });


router.post('/signup', signupUser); // Signup User

router.post('/login', loginUser); // Login User

module.exports = router;
