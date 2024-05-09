var express = require('express');
var router = express.Router();

const itemsFromDatabase = [
  { id: 1, name: 'Item 1' },
  { id: 2, name: 'Item 2' },
  { id: 3, name: 'Item 3' },
  { id: 4, name: 'Item 4' },
  { id: 5, name: 'Item 5' },
  { id: 6, name: 'Item 6' },
  { id: 7, name: 'Item 7' },
  // Add more items as needed
];

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express', items: itemsFromDatabase });
});



module.exports = router;
