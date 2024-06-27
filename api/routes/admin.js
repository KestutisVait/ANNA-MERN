var express = require('express');
var router = express.Router();
const AdminController = require('../controllers/adminController');
const passport = require('../passport/bearerStrategy');
const AdminRequests = require('../requests/AdminRequests');

/* GET users listing. */
router.get('/all', AdminController.getAdmins);
router.get('/one', AdminController.getAdmin);
router.post('/create', AdminRequests.createAdmin, AdminController.create);
router.put('/update', AdminRequests.updateAdmin, AdminController.update);
router.delete('/delete', AdminController.delete);
router.post('/login', AdminRequests.loginAdmin, AdminController.login);
router.post('/logout', AdminController.logout);
router.get(
  '/authenticate', 
  passport.authenticate('bearer', { session: false }), 
  (req, res) => res.status(200).json({authenticated: true, admin: req.user.name}));


module.exports = router;
