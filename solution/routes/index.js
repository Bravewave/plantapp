var express = require('express');
var router = express.Router();
var plants = require('../controllers/plants')
var multer = require('multer');

// storage defines the storage options to be used for file upload with multer
var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'public/images/uploads/');
  },
  filename: function (req, file, cb) {  // TODO: check again
    var original = file.originalname;
    var file_extension = original.split(".");
    // Make the file name the date + the file extension
    filename =  Date.now() + '.' + file_extension[file_extension.length-1];
    cb(null, filename);
  }
});
let upload = multer({ storage: storage });

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
router.get('/', function(req, res) {
  res.render('index', { title: 'PlantApp', items: itemsFromDatabase });
});

router.get('/addplant', function(req, res) {
  res.render('addPlant', { title: 'Add Plant' });
});

router.get("/test", (req, res) => {
  res.render("testing");
});

router.post('/add', upload.single('plantImg'), function (req, res) {
	let userData = req.body;
	let filePath = req.file.path;
	let result = plants.create(userData, filePath);
	console.log(result);
	res.redirect('/');
});

module.exports = router;
