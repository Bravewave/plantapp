let mongoose = require('mongoose');

// Define the schema for the Plant model
let PlantSchema = new mongoose.Schema(
    {
        user_name: { type: String, required: true, max: 100 },
        plant_name: { type: String, required: false, max: 100 },
        dts: { type: Date, required: true },
        lat: { type: Number, required: true },
        lon: { type: Number, required: true },
        plant_desc: { type: String, required: true, max: 300 },
        plant_height: { type: Number, required: true },
        plant_spread: { type: Number, required: true },
        flowers: { type: String, required: false, max: 10 },
        leaves: { type: String, required: false, max: 10 },
        fruits_seeds: { type: String, required: false, max: 10 },
        sun_exposure: { type: String, required: false, max: 10 },
        sun_char: { type: String, required: false, max: 30 },
        plant_colour: { type: String, required: true, max: 40 },
<<<<<<< HEAD
=======
        status: {type:String, required: true, max: 20},
        // Define the img field with type String
>>>>>>> origin/lara
        img: { type: String }
    }
);

// Configure the 'toObject' option for the schema to include getters
// and virtuals when converting to an object
PlantSchema.set('toObject', { getters: true, virtuals: true });

// Create the mongoose model 'Plant' based on the defined schema
let Plant = mongoose.model('plant', PlantSchema);

// Export the Plant model for use in other modules
module.exports = Plant;