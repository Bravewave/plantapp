let mongoose = require('mongoose');

// Get the Schema class from mongoose
let Schema = mongoose.Schema;

// Define the schema for the Plant model
let PlantSchema = new Schema(
    {
        user_name: { type: String, required: true, max: 100 },
        plant_name: { type: String, required: false, max: 100 },
        dts: { type: Date, required: true },
        lat: { type: Number, required: true, min: -90, max: 90 },
        lon: { type: Number, required: true, min: -180, max: 180 },
        plant_desc: { type: String, required: true, max: 300 },
        plant_height: { type: Number, required: true, min:0, default: 0 },
        plant_spread: { type: Number, required: true, min:0, default: 0 },
        db_pedia_link: { type: String, required: false, max: 300 },
        flowers: { type: String, required: false, max: 10 },
        leaves: { type: String, required: false, max: 10 },
        fruits_seeds: { type: String, required: false, max: 10 },
        sun_exposure: { type: String, required: false, max: 10 },
        plant_colour: { type: String, required: true, max: 40 },
        // Define the img field with type String
        //img: { type: String }
    }
);

// Configure the 'toObject' option for the schema to include getters
// and virtuals when converting to an object
PlantSchema.set('toObject', { getters: true, virtuals: true });

// Create the mongoose model 'Plant' based on the defined schema
let Plant = mongoose.model('plant', PlantSchema);

// Export the Plant model for use in other modules
module.exports = Plant;