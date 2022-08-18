const Booking = require('../models/Booking');

const bookingController = {};

//Book appointment
bookingController.create = async(req,res) => {
    try {
        //Get the data from token & body
        const userId = req.user_id;
        const {date, hour} = req.body;
    
        const newBook = {
            userId,
            date,
            hour
        }

        //Check if i already have more than 2 bookings for the same date & hour, if so, i reject the appointment
        const bookingDate = await Booking.find({date : date})
        if(bookingDate.length >= 2){
            const bookingHour = await Booking.find({hour:hour})
            if(bookingHour.length >= 2){
                return res.status(404).json(
                    {
                        success: true,
                        messagge: "Unable to book an appointment, already 2 or more bookings for this range of time"
                    }
                );
            }
        }
        
        //Create new booking
        await Booking.create(newBook);
        return res.status(200).json(
            {
                success: true,
                message: "Congratulations!",
                data: newBook
            }
        )

    } catch (error) {
        return res.status(404).json(
            {
                success: true,
                messagge: "Unable to book"
            }
        );
    }
}

module.exports = bookingController;