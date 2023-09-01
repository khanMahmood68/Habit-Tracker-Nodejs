const express = require('express');
const router = express.Router();

const usersController = require('../controllers/users_controller');
const passport = require('passport');

router.get('/sign-up',usersController.signUp);
router.get('/sign-in',usersController.signIn);

router.post('/create',usersController.create)

// Use passport as a middleware to authenticate
router.post('/create-session',
    passport.authenticate(
        'local',{
            failureRedirect:'/users/sign-in'
        }
    ),
    usersController.createSession
)

router.get('/sign-out',usersController.destroySession);
router.use('/habit',require('./habit'))

module.exports = router;