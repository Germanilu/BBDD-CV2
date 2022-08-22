const router = require('express').Router()
const userController = require('../controllers/UserController');
const isSuperAdmin = require('../middlewares/isSuperAdmin');
const verifyToken = require('../middlewares/verifyToken');

//Rutes
router.get('/users', verifyToken, isSuperAdmin, userController.getAll);  
router.get('/users/:id', verifyToken, isSuperAdmin, userController.getUserById); 
router.delete('/users/:id',verifyToken,  userController.deleteById);
router.put('/users/:id', verifyToken, userController.update);
router.put('/editRole/:id',verifyToken,isSuperAdmin,userController.updateRole)

//Exporto router
module.exports = router