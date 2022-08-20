const mongoose = require ('mongoose');

const VetSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    specialization: {
        type: String
    }
})

const Vet = mongoose.model('Vet',VetSchema);

module.exports = Vet;