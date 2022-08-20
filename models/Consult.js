const mongoose = require('mongoose');
const moment = require('moment');

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
    message:{
        type:String,
        required:true
    }
})

const Consult = mongoose.model('Consult',consultSchema);
module.exports = Consult