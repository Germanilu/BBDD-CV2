const authController = require('../controllers/AuthController'); 
const verifyToken = require('../middlewares/verifyToken');
const router = require('express').Router();

// Rutes
router.post('/auth/register', authController.register);
router.post('/auth/login', authController.login);
router.get('/auth/profile', verifyToken, authController.profile);

//Export router
module.exports = router;