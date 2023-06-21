const express = require('express');
const router = express.Router();
const userController = require('../controllers/users_controller');
const passport = require('passport');

router.post('/create', userController.create);

router.get('/profile/:id',passport.checkAuthentication, userController.profile);
router.post('/update/:id',passport.checkAuthentication, userController.update);

router.get('/signup',userController.signup);
router.get('/signin',userController.signin);
router.get('/signout',userController.destroySession);

//Use passport as a middleware to authenticate
router.post('/create-session', passport.authenticate(
    'local', 
    {   failureRedirect : '/users/signin'   },
), userController.createSession);


module.exports = router;