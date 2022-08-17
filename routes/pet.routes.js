const router = require('express').Router();

const petController = require('../controllers/PetController');


const isSuperAdmin = require('../middlewares/isSuperAdmin');
const verifyToken = require('../middlewares/verifyToken');

//Routes

router.post('/pet/register', verifyToken, petController.register)


module.exports = router;