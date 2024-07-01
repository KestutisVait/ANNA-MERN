var express = require('express');
var router = express.Router();
const SlideController = require('../controllers/slidesController');
const SlideRequests = require('../requests/SkideRequests');

/* GET home page. */
router.get('/', SlideController.getSlides);
router.post('/add', SlideRequests.createSlide, SlideController.create);
router.delete('/delete', SlideController.delete);

module.exports = router;
