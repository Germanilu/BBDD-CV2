const router = require('express').Router();
const vetController = require('../controllers/VetController');
const isSuperAdmin = require('../middlewares/isSuperAdmin');
const verifyToken = require('../middlewares/verifyToken');

//Rutes
router.post('/newVet',verifyToken,isSuperAdmin,vetController.create);
router.get('/vet',verifyToken, isSuperAdmin, vetController.getAll);
router.get('/vet/:id',verifyToken, isSuperAdmin, vetController.getVetById);
router.delete('/vet/:id', verifyToken,isSuperAdmin,vetController.deleteById);

module.exports = router;