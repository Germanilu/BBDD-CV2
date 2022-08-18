const mongoose = require('mongoose');
const moment = require('moment');
let now = moment()

const bookingSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    date: {
        type: Date,
        required: true
    },

    hour: {
        type: Number,
        required: true
    }

})

const Booking = mongoose.model('Booking', bookingSchema);

module.exports = Booking;