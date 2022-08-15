//Middleware un middleware es una funcion que lo que hace es se ejecutarse antes o despues de la logica de  nuestro controlador

//Requiero jsonwebtoken (No lo estoy utilizando de momento)
const jwt = require('jsonwebtoken'); 

//Creo funcion para verificar si es superadmin
const isSuperAdmin = (req,res,next) => {

    try {
        //Si el usuario no tiene rol de super_admin no puede acceder
        if(req.user_role !== "super_admin"){
            return res.status(200).json(
                {
                    success: false,
                    message: "don't have user permission "
                }
            );
        }
        //Si la condicion no se cumple, seguira adelante.
        next()

    } catch (error) {
        return res.status(500).json(
            {
                success: false,
                message: "don't have user permission"
            }
        );
    }
};


//Exporto isSuperAdmin
module.exports = isSuperAdmin