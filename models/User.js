const mongoose = require('mongoose');


const UserSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    surname:{
        type: String,
        required: true
    },
    cf:{
        type: String,
        required: true
    },
    mobile:{
        type: Number,
        required: true
    },
    address:{
        type: String,
        required: true
    },
    city:{
        type: String,
        required: true
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
        enum: ['user','super_admin'],
        default: 'user'
    }
    
},
    //Para que se ponga por defecto createdAt y updatedAt con la fecha actual
    {
        timestamps: true   
    }

);

const User = mongoose.model('User',UserSchema);

module.exports = User;

