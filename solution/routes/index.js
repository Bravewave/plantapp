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

    // retrieve plant info from DBPedia
    const plant_name = "Rose";
    const resource = `http://dbpedia.org/resource/${plant_name}`;
    const endpointUrl = 'https://dbpedia.org/sparql';

    const sparqlQuery = `
      PREFIX rdfs: <http://www.w3.org/2000/01/rdf-schema#>
      PREFIX dbo: <http://dbpedia.org/ontology/>
      PREFIX dbp:<http://dbpedia.org/property/>
      
      SELECT ?name ?sci_name ?abstract ?uri
      WHERE {
      <${resource}> rdfs:label ?name .
      OPTIONAL {<${resource}> dbp:taxon ?sci_name .}
      <${resource}> dbo:abstract ?abstract .
      BIND (<${resource}> AS ?uri)
      FILTER (LANG(?abstract) = "en") .
      FILTER (LANG(?name) = "en") .
      FILTER (LANG(?sci_name) = "en") .
  }`;

    const encodedQuery = encodeURIComponent(sparqlQuery);

    const url = `${endpointUrl}?query=${encodedQuery}&format=json`;

    fetch(url)
        .then(response => response.json())
        .then(data => {
            let bindings = data.results.bindings;
            if (bindings.length > 0) {
                res.render('index', {
                    plant_name:bindings[0].name.value,
                    plant_sci_name:bindings[0].sci_name ? bindings[0].sci_name.value : "Unknown",
                    dbpedia_desc: bindings[0].abstract.value,
                    dbpedia_uri: bindings[0].uri.value
                    // JSONresult: result
                });
            } else {
                res.render('index', {
                    plant_name: "Unknown",
                    plant_sci_name: "Unknown",
                    dbpedia_desc: "Unknown",
                    dbpedia_uri: "Unknown"
                });
            }

        });

    res.redirect('/');
});

module.exports = router;
