const mongoose = require('mongoose');

const consultSchema = new mongoose.Schema({
    userId:{
        type: mongoose.Schema.Types.ObjectId,
        ref:'User',
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
        type:Date,
        required:true,
        default: new Date()
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