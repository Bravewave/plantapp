// Import the plant model
const plantModel = require('../models/plants');

// Function to create new plants - TODO
exports.create = function (userData) {
    // Create a new plant instance using the provided user data
    let plant = new plantModel({
        user_name: userData.user_name,
        plant_name: userData.plant_name,
        dts: userData.dts,
        lat: userData.lat,
        lon: userData.lon,
        plant_desc: userData.plant_desc,
        plant_height: userData.plant_height,
        plant_spread: userData.plant_spread,
        db_pedia_link: userData.db_pedia_link,
        flowers: userData.flowers,
        leaves: userData.leaves,
        fruits_seeds: userData.fruits_seeds,
        sun_exposure: userData.sun_exposure,
        plant_colour: userData.plant_colour,
        status: userData.status,
    });

    // Save the plant to the databases and handle success or failure
    return plant.save().then(plant => {
        // Log the created plant
        console.log(plant);

        // Return the plant data as a JSON string
        return JSON.stringify(plant);
    }).catch(err => {
        // Log the error if saving fails
        console.log(err);

        // Return null in case of an error
        return null;
    });
};

// Function to get all plants
exports.getAll = function () {
    // Retrieve all plants from the databases
    return plantModel.find({}).then(plants => {
        // Return the list of plants as a JSON string
        return JSON.stringify(plants);
    }).catch(err => {
        // Log the error if retrieval fails
        console.log(err);

        // Return null in case of an error
        return null;
    });
};