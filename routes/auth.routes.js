//Me llevo los controllers a esta constante
const authController = require('../controllers/AuthController'); 
const verifyToken = require('../middlewares/verifyToken');
//Requiero express
const router = require('express').Router();

// Ruta para registrar el usuario
router.post('/auth/register', authController.register);
// Ruta para loguear el usuario
router.post('/auth/login', authController.login);
// Ruta para revisar el perfil del usuario
router.get('/auth/profile', verifyToken, authController.profile);

//Exporto router
module.exports = router;