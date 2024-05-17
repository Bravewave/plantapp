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

/* Get welcome page */
router.get("/", (req, res) => {
  res.render("index", { title: "Welcome Page" });
});

/* GET home page. */
router.get('/feed', async (req, res) => {
    // get all plants created
    let dbPlants= await plants.getAll();

    const fetchPromises = dbPlants.map(plant => {
        let plant_namee = plant.plant_name;

        // const resource = `http://dbpedia.org/resource/${plant_namee}`;
        const endpointUrl = 'https://dbpedia.org/sparql';

        const sparqlQuery = `
            PREFIX rdfs: <http://www.w3.org/2000/01/rdf-schema#>
            PREFIX dbo: <http://dbpedia.org/ontology/>
            PREFIX dbp: <http://dbpedia.org/property/>
            
            SELECT ?commonName ?sci_name ?description ?uri
            WHERE {
              ?uri rdf:type dbo:Plant .
              ?uri dbp:name ?commonName .
              OPTIONAL { ?uri dbp:genus ?sci_name }
              ?uri rdfs:comment ?description .
              FILTER (lang(?commonName) = 'en')
              FILTER (lang(?description) = 'en')
              
              FILTER (
              (CONTAINS(LCASE(?description), LCASE(" ${plant_namee.trim()} "))) 
              )
          
        }
        LIMIT 1`;

        const encodedQuery = encodeURIComponent(sparqlQuery);

        const url = `${endpointUrl}?query=${encodedQuery}&format=json`;

        return fetch(url)
            .then(response => response.json())
            .then(data => {
                // Store the fetched data in the plant object
                let bindings = data.results.bindings;
                // console.log(bindings);
                if (bindings.length > 0) {
                    plant.common_name = bindings[0].commonName.value;
                    plant.plant_sci_name = bindings[0].sci_name ? bindings[0].sci_name.value : "Unknown";
                    plant.dbpedia_desc = bindings[0].description.value;
                    plant.dbpedia_uri = bindings[0].uri.value;
                } else {
                    plant.common_name = "Unknown";
                    plant.plant_sci_name = "Unknown";
                    plant.dbpedia_desc = "Unknown";
                    plant.dbpedia_uri = "";
                }
            })
            .catch(error => {
                console.error("Error fetching data for plant:", plant_namee, error);
                plant.error = error.message;
            });
    });

    Promise.all(fetchPromises)
        .then(() => {
            res.render("feed", { title: "Plant App", items: dbPlants });
        })
        .catch(error => {
            console.error("Error gathering data:", error);
            res.render("feed", { title: "Plant App", items: [] });
        });
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

// Route to render the edit plant form
router.get('/edit/:id', async (req, res) => {
    let id = req.params.id;

    try {
        const plant = await plants.getById(id);
        console.log("Plant", plant);
        // Check if the status is "In Progress" before allowing edit
        if (plant.status === 'In Progress') {
            res.render('editPlant', { title: 'Edit Plant', plant });
        } else {
            // If status is not "In Progress", redirect back with a message
            res.redirect(`/`);
        }
    } catch (error) {
        console.error(error);
    }
});

// Route to handle the form submission to edit a plant
router.post('/edit/:id', upload.single('plantImg'), async (req, res) => {
    let userData = req.body;
    let filePath = req.file ? req.file.path : null;  // Handle the case where no new file is uploaded
    let result = await plants.update(req.params.id, userData, filePath);
    console.log(result);

    res.redirect('/');
});


router.get("/addplant", (req, res) => {
  res.render("addPlant", { title: "Add Plant" });
});

router.post('/add', upload.single('plantImg'), function (req, res) {
	let userData = req.body;
	let filePath = req.file.path;
	let result = plants.create(userData, filePath);
	console.log(result);

  res.redirect('/');
});

module.exports = router;
