const mongoose = require ('mongoose');

const VetSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    surname: {
        type: String,
        required: true
    },
    specialization: {
        type: String
    },
    email: {
        type: String,
        required: true, 
        unique: true, 
    },
    password: {
        type: String,
        required: true,
        minLength: 6, 
    },
    role: {
        type: String,
        enum: ['user','vet','super_admin'],
        default: 'vet'
    }
})

const Vet = mongoose.model('Vet',VetSchema);

module.exports = Vet;