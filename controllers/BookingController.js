const Booking = require('../models/Booking');

const bookingController = {};

//Book appointment
bookingController.create = async (req, res) => {
    try {
        //Get the data from token & body
        const userId = req.user_id;
        const { date, hour } = req.body;

        const newBook = {
            userId,
            date,
            hour
        }

        //Check if i already have more than 2 bookings for the same date & hour, if so, i reject the appointment
        const bookingDate = await Booking.find({ date: date })
        if (bookingDate.length >= 2) {
            const bookingHour = await Booking.find({ hour: hour })
            if (bookingHour.length >= 2) {
                return res.status(404).json(
                    {
                        success: true,
                        messagge: "Unable to book an appointment"
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
                messagge: "Error while trying to book an appointment"
            }
        );
    }
}

//Get all my bookings
bookingController.getAllByUserId = async (req, res) => {
    try {
        //Retrive user id by tokem
        const userId = req.user_id;
        const booking = await Booking.find({ userId });

        //If not reject
        if (booking.length === 0) {
            return res.status(404).json(
                {
                    success: false,
                    message: "You don't have any pending booking yet"
                }
            )
        }

        return res.status(200).json(
            {
                success: true,
                message: 'All bookings retrieved succsessfully',
                data: booking
            }
        )

    } catch (error) {
        return res.status(500).json(
            {
                success: false,
                message: 'Error retriving Bookings',
                error: error.message
            }
        )
    }
}

//Get All booking (ADMIN)
bookingController.getAll = async (req, res) => {
    try {
        const booking = await Booking.find()
        //Validation
        if (!booking) {
            return res.status(200).json(
                {
                    success: true,
                    message: 'No pending bookings ',
                }
            )
        }
        return res.status(200).json(
            {
                success: true,
                message: 'All orders retrieved succsessfully',
                data: booking
            }
        )
    } catch (error) {
        return res.status(500).json(
            {
                success: false,
                message: 'Error retriving all orders',
                error: error.message
            }
        )
    }
}

//Delete appointment
bookingController.delete = async (req, res) => {
    try {
        const id = req.params
        const bookingDelete = await Booking.findOneAndDelete(id);
        //validation
        if (bookingDelete == null) {
            return res.status(500).json({
                success: false,
                message: "Unable to delete booking "
            })
        }

        return res.status(200).json({
            success: true,
            message: "Your Booking has been deleted",
        })
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Error detected",
            data: error?.message || error
        })
    }
}

module.exports = bookingController;