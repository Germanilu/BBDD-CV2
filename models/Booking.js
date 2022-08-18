const mongoose = require('mongoose');


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
        type: String,
        required: true
    }

})

const Booking = mongoose.model('Booking', bookingSchema);

module.exports = Booking;