var express = require('express');
var router = express.Router();
const EventsController = require('../controllers/eventsController');
// const SlideRequests = require('../requests/SkideRequests');

/* GET home page. */
router.get('/', EventsController.getEvents);
// router.get('/one', EventsController.getEvent);
router.post('/create', EventsController.create);
// router.get('/one', SlideController.getSlide);
// router.post('/add', SlideRequests.createSlide, SlideController.create);
// router.put('/update', SlideRequests.createSlide, SlideController.update);
// router.put('/reorder', SlideController.reorder);
// router.delete('/delete', SlideController.delete);

module.exports = router;
