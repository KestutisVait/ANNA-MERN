var express = require('express');
var router = express.Router();
const SlideController = require('../controllers/slidesController');
const SlideRequests = require('../requests/SkideRequests');

/* GET home page. */
router.get('/', SlideController.getSlides);
router.get('/add', SlideController.create);

module.exports = router;
