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



router.get('/laratest', async (req, res) => {
    const dbPlantNames= await plants.getPlantNames() // get list of plant names
    console.log(dbPlantNames);

    // retrieve plant info from DBPedia
    const plant_namee = "Rose";
    const resource = `http://dbpedia.org/resource/${plant_namee}`;
    const endpointUrl = 'https://dbpedia.org/sparql';

    const sparqlQuery = `
        PREFIX rdfs: <http://www.w3.org/2000/01/rdf-schema#>
        PREFIX dbo: <http://dbpedia.org/ontology/>
        PREFIX dbp: <http://dbpedia.org/property/>
        
        SELECT ?name ?sci_name ?description ?uri
        WHERE {
          ?uri rdf:type dbo:Plant .
          ?uri dbp:name ?commonName .
          OPTIONAL { ?uri dbp:genus ?sci_name }
          ?uri rdfs:comment ?description .
          FILTER (lang(?commonName) = 'en' && (CONTAINS(?description, "common")) && (CONTAINS(?description, "${plant_namee}")))
      
  }`;

const encodedQuery = encodeURIComponent(sparqlQuery);

const url = `${endpointUrl}?query=${encodedQuery}&format=json`;

try {
    const dbPlants= await plants.getAll();
    fetch(url)
        .then(response => response.json())
        .then(data => {
            let bindings = data.results.bindings;
            if (bindings.length > 0) {
                dbPlants.map(plant => {
                    plant.plant_sci_name = bindings[0].sci_name ? bindings[0].sci_name.value : "Unknown";
                    plant.dbpedia_desc = bindings[0].description.value;
                    plant.dbpedia_uri = bindings[0].uri.value;
                });
                res.render("index", { title: "Plant App", items: dbPlants });
            } else {
                dbPlants.map(plant => {
                    plant.plant_sci_name = "Unknown";
                    plant.dbpedia_desc = "Unknown";
                    plant.dbpedia_uri = "";
                });
                res.render("index", { title: "Plant App", items: dbPlants });
            }

        });
} catch (error) {
    console.error(error);
    res.render("index", { title: "Plant App", items: [] });
}
});


router.post('/add', upload.single('plantImg'), function (req, res) {
	let userData = req.body;
	let filePath = req.file.path;
	let result = plants.create(userData, filePath);
	console.log(result);

    res.redirect('/');
});

module.exports = router;
