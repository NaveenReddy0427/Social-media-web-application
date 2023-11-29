const express = require('express');
const router = express.Router();

const userController = require('../controllers/users_controller')

router.get('/profile', userController.profile);
router.get('/signup', userController.signUp);
router.get('/signin', userController.signIn);

// router for signup and signin 
router.post('/create', userController.create)


module.exports = router;
