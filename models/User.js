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
    //To obtain data createdAt & updatedAt by default
    {
        timestamps: true   
    }

);

const User = mongoose.model('User',UserSchema);
module.exports = User;

