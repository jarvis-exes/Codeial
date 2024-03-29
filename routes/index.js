const express = require('express');
const router = express.Router();
const homeController = require('../controllers/home_controller');

console.log('Router is loaded');

router.get('/',homeController.home);
router.use('/users',require('./users'));
router.use('/posts',require('./posts'));
router.use('/comments',require('./comments'));
router.use('/likes', require('./likes'));
router.use('/api', require('./api'));
// Any further routes can be accesed from here
// router.use('/routerName', require('./routerFile'))

module.exports = router;