const mongoose = require('mongoose');
const PetSchema = new mongoose.Schema({

    userId:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    name: {
        type: String,
        required: true,
    },
    type: {
        type: String,
        required: true,
    },
    breed: {
        type: String,
        required: true,
    },
    age:{
        type: Date,
        required: true
    },
    weight: {
        type: Number,
        required: true
    },
    diseases: {
        type: String
    }
})

const Pet = mongoose.model('Pet',PetSchema);
module.exports = Pet;