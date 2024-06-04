var express = require('express');
var router = express.Router();
const NavController = require('../controllers/navigationController');

/* GET users listing. */
router.get('/', NavController.getNavItems);

module.exports = router;
