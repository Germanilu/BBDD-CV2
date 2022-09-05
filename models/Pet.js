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
        enum:['Gatto', 'Cane', 'Coniglio', 'Roditore', 'Uccello'],
        required: true,
    },
    breed: {
        type: String,
    },
    age:{
        type: String,
        required: true,
    },
    weight: {
        type: String,
        required: true
    },
    diseases: {
        type: String
    },
    avatar: {
        type: String
    }
})

const Pet = mongoose.model('Pet',PetSchema);
module.exports = Pet;