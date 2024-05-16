const express = require('express');
const router = express.Router();
const plants = require('../controllers/plants')
const multer = require('multer');

// storage defines the storage options to be used for file upload with multer
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'public/images/uploads/');
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + "-" + file.originalname);
}
});
const upload = multer({ storage: storage });

const dbPlants = plants.getAll();

/* GET home page. */
router.get('/', async (req, res) => {
  try {
    const dbPlants = await plants.getAll();
    console.log(dbPlants);
    res.render("index", { title: "Plant App", items: dbPlants });
  } catch (error) {
    console.error(error);
    res.render("index", { title: "Plant App", items: [] });
  }
});


router.post('/filter', async (req, res) => {
  try {
    const { sort_order = 'newest', traits } = req.body;
    const filters = Array.isArray(traits) ? traits : (traits ? [traits] : []);
    const filteredPlants = await plants.getFiltered(filters, sort_order);
    res.json({ items: filteredPlants }); // Send JSON response for AJAX
  } catch (error) {
    console.error(error);
    res.status(500).json({ items: [] });
  }
});


router.get('/addplant', function(req, res) {
  res.render('addPlant', { title: 'Add Plant' });
});

router.get("/test", (req, res) => {
  res.render("testing", { title: "Testing Page" });
});

router.post('/add', upload.single('plantImg'), function (req, res) {
	let userData = req.body;
	let filePath = req.file.path;
	let result = plants.create(userData, filePath);
	console.log(result);
	res.redirect('/');
});

module.exports = router;
