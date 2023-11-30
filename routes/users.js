const express = require('express');
const router = express.Router();
const passport = require('passport');


const userController = require('../controllers/users_controller')

router.get('/profile', passport.checkAuthentication, userController.profile);
router.get('/signup', userController.signUp);
router.get('/signin', userController.signIn);

// router for signup and signin 
router.post('/create', userController.create)

// use passport as middleware to authenticate
router.post('/create-session', passport.authenticate(
    'local', 
    {failureRedirect: '/users/signin'}
), userController.createSession)

// route for signout 
router.get('/signout', userController.destroySession)




module.exports = router;
