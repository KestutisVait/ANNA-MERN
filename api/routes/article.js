var express = require('express');
var router = express.Router();
const ArticleController = require('../controllers/articleController');
const ArticleRequests = require('../requests/ArticleRequests');

router.get('/', ArticleController.getAll);
router.get('/one', ArticleController.getOne);
router.post('/create', ArticleRequests.createArticle, ArticleController.create);
router.put('/update', ArticleRequests.createArticle,ArticleController.update);

module.exports = router;
