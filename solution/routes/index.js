var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/addplant', function(req, res, next) {
  res.render('addPlant', { title: 'Add Plant' });
});

module.exports = router;
