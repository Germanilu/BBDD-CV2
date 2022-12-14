const consultController = require('../controllers/ConsultController');
const verifyToken = require('../middlewares/verifyToken');
const verifyVetToken = require('../middlewares/verifyVetToken')
const isVet = require('../middlewares/isVet');
const isSuperAdmin = require('../middlewares/isSuperAdmin');
const router = require('express').Router();

//User Rutes
router.post('/newConsult',verifyToken, consultController.create);
router.get('/myConsult', verifyToken,consultController.getByUserId)
router.delete('/myConsult/:id',verifyToken, consultController.delete)

//Vet Rutes
router.put('/consult/:id', verifyVetToken,isVet,consultController.reply)
router.get('/consult',verifyVetToken,isVet,consultController.getAllByVetId)
router.get('/allConsultsUnrep',verifyVetToken,isVet,consultController.getAllConsultUnreply)
router.get('/allConsults', verifyToken,isSuperAdmin,consultController.getAll)

module.exports = router