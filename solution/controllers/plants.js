// Import the plant model
const plantModel = require('../models/plants');

// Function to create new plants - TODO
exports.create = function (userData, filePath) {
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
        flowers: !!userData.flowers, 
        leaves: !!userData.leaves, 
        fruits_seeds: !!userData.fruits_seeds, 
        sun_exposure: !!userData.sun_exposure, 
        sun_char: userData.sunChar,
        plant_colour: userData.plant_colour,
        status: userData.status,
        img: filePath,
        comments: userData.comments,
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
exports.getAll = async () => {
    try {
        const plants = await plantModel.find().sort({ dts: -1 }); 
        return plants;
    } catch (error) {
        console.error(error);
        return [];
    }
};

// Function to filter plants
exports.getFiltered = async (filters, sortOrder) => {
    try {
        let query = {};

        if (filters.length > 0) {
            filters.forEach(filter => {
                query[filter] = true;
            });
        }

        // Fetch filtered plants from the database
        let plants = await plantModel.find(query);

        // Sort the plants by date
        plants.sort((a, b) => {
            if (sortOrder === 'newest') {
                return new Date(b.dts) - new Date(a.dts);
            } else {
                return new Date(a.dts) - new Date(b.dts);
            }
        });

        return plants;
    } catch (error) {
        console.error(error);
        return [];
    }
};

exports.getById = async function (id) {
    try {
        return await plantModel.findById(id).exec();
    } catch (error) {
        console.error(error);
        throw error;
    }
};

exports.update = async function (id, userData, filePath) {
    try {
        const updateData = { ...userData };
        if (filePath) {
            updateData.plantImg = filePath;
        }
        return await plantModel.findByIdAndUpdate(id, updateData, { new: true }).exec();
    } catch (error) {
        console.error(error);
        throw error;
    }
};