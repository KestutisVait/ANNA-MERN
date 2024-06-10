var express = require('express');
var router = express.Router();
const AdminController = require('../controllers/adminController');
const passport = require('../passport/bearerStrategy');

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('wellcome admin');
});

router.post('/login', AdminController.login);
router.get('/logout', AdminController.create);
router.get(
  '/authenticate', 
  passport.authenticate('bearer', { session: false }), 
  (req, res) => res.json({authenticated: true}));


module.exports = router;
