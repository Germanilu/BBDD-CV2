const router = require('express').Router();

const petController = require('../controllers/PetController');


const isSuperAdmin = require('../middlewares/isSuperAdmin');
const verifyToken = require('../middlewares/verifyToken');

//Routes

router.post('/pet/register', verifyToken, petController.register)
router.delete('/pet:id', verifyToken, petController.deleteById)
router.put('/pet:id', verifyToken,petController.update)
router.get('/pets',verifyToken,isSuperAdmin,petController.getAll)
router.get('/pets:id', verifyToken, isSuperAdmin, petController.getPetById)
router.get('/pet:userId',verifyToken,isSuperAdmin,petController.getByUserId)


module.exports = router;