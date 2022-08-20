const mongoose = require('mongoose');


const consultSchema = new mongoose.Schema({
    userId:{
        type: mongoose.Schema.Types.ObjectId,
        ref:'User',
        required:true
    },
    vetId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Vet'
    },
    date:{
        type:Date,
        required:true
    },
    userMessage:{
        type:String,
        required:true
    },
    vetMessage:{
        type:String
    }
})

const Consult = mongoose.model('Consult',consultSchema);
module.exports = Consult