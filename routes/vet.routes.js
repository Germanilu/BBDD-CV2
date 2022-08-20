const router = require('express').Router();

const vetController = require('../controllers/VetController');

//Requiero la funcion middleware de isSuperAdmin
const isSuperAdmin = require('../middlewares/isSuperAdmin');
//Requiero la funcion middleware de verifyToken
const verifyToken = require('../middlewares/verifyToken');
const verifyVetToken = require('../middlewares/verifyVetToken');

router.post('/newVet',verifyToken,isSuperAdmin,vetController.create);
router.get('/vet',verifyToken, isSuperAdmin, vetController.getAll);
router.get('/vet/:id',verifyToken, isSuperAdmin, vetController.getVetById);
router.delete('/vet/:id', verifyToken,isSuperAdmin,vetController.deleteById);



module.exports = router;