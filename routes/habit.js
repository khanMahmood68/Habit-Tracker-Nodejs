const express = require('express');
const router = express.Router();
const passport = require('passport')
const habitsController = require('../controllers/habit_controller')

router.post('/create',passport.checkAuthentication,habitsController.createHabit);
router.get('/favorite-habit',habitsController.favoriteHabit);
router.get('/remove',habitsController.destroyHabit);
router.get('/status-update',habitsController.statusUpdate);


module.exports = router;