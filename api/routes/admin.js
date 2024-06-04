var express = require('express');
var router = express.Router();
const AdminController = require('../controllers/adminController');

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('wellcome admin');
});

router.post('/create', AdminController.create);

module.exports = router;
