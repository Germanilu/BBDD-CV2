const bookingController = require('../controllers/BookingController');
const verifyToken = require('../middlewares/verifyToken');
const verifyVetToken = require('../middlewares/verifyVetToken')
const isVet = require('../middlewares/isVet');
const router = require('express').Router();

//Rutes
router.post('/booking', verifyToken, bookingController.create)
router.get('/myBooking', verifyToken, bookingController.getAllByUserId)
router.get('/booking', verifyVetToken, isVet, bookingController.getAll)
router.delete('/booking/:id', verifyToken, bookingController.delete)

module.exports = router;