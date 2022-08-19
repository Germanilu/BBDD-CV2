const bookingController = require('../controllers/BookingController');
const verifyToken = require('../middlewares/verifyToken');
const isSuperAdmin = require('../middlewares/isSuperAdmin');
const router = require('express').Router();

//Book appointment
router.post('/booking', verifyToken, bookingController.create)
router.get('/booking/:userId', verifyToken, bookingController.getAllByUserId)
router.delete('/booking/:id', verifyToken, bookingController.delete)


module.exports = router;