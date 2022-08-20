const router = require('express').Router();

const vetController = require('../controllers/VetController');

//Requiero la funcion middleware de isSuperAdmin
const isSuperAdmin = require('../middlewares/isSuperAdmin');
//Requiero la funcion middleware de verifyToken
const verifyToken = require('../middlewares/verifyToken');

router.post('/newVet',verifyToken,isSuperAdmin,vetController.create);
router.post('/vet/login',vetController.login)


module.exports = router;