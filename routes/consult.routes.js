const consultController = require('../controllers/ConsultController');
const verifyToken = require('../middlewares/verifyToken');
const verifyVetToken = require('../middlewares/verifyVetToken')
const isVet = require('../middlewares/isVet');
const isSuperAdmin = require('../middlewares/isSuperAdmin');
const router = require('express').Router();

router.post('/newConsult',verifyToken, consultController.create);
router.get('/myConsult', verifyToken,consultController.getByUserId)
router.delete('/myConsult/:id',verifyToken, consultController.delete)


router.put('/consult/:id', verifyVetToken,isVet,consultController.reply)

module.exports = router