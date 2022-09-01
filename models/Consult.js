const mongoose = require('mongoose');
const moment = require('moment')
moment.locale("it")

const consultSchema = new mongoose.Schema({
    userId:{
        type: mongoose.Schema.Types.ObjectId,
        ref:'User',
        required:true
    },
    userName:{
        type: String,
        required:true
    },
    userSurname:{
        type: String,
        required:true
    },
    petId:{
        type: mongoose.Schema.Types.ObjectId,
        ref:'Pet',
        required:true
    },
    vetId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Vet'
    },
    date:{
        type:String,
        required:true,
        default: () => moment().format("dddd, DD MMMM YYYY")
    },
    userMessage:{
        type:String,
        required:true
    },
    vetName:{
        type:String
    },
    vetMessage:{
        type:String
    }
})

const Consult = mongoose.model('Consult',consultSchema);
module.exports = Consult