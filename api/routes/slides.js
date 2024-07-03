var express = require('express');
var router = express.Router();
const SlideController = require('../controllers/slidesController');
const SlideRequests = require('../requests/SkideRequests');

/* GET home page. */
router.get('/', SlideController.getSlides);
router.get('/one', SlideController.getSlide);
router.post('/add', SlideRequests.createSlide, SlideController.create);
router.put('/update', SlideRequests.createSlide, SlideController.update);
router.delete('/delete', SlideController.delete);

module.exports = router;
