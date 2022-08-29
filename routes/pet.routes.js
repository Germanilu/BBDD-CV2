const router = require('express').Router();
const petController = require('../controllers/PetController');

const isSuperAdmin = require('../middlewares/isSuperAdmin');
const verifyToken = require('../middlewares/verifyToken');
const verifyVetToken = require('../middlewares/verifyVetToken')
const isVet = require('../middlewares/isVet');

//Routes
router.post('/pet/register', verifyToken, petController.register)
router.delete('/pet:id', verifyToken, petController.deleteById)
router.put('/pet:id', verifyToken,petController.update)
router.get('/myPets',verifyToken,petController.getMyPets)
router.get('/pets',verifyToken,isSuperAdmin,petController.getAll)
router.get('/pets:id', verifyToken, petController.getPetById)
router.get('/pet/:userId',verifyVetToken, isVet,petController.getByUserId)

module.exports = router;