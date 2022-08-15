//Importo jsonwebtoken
const jwt = require('jsonwebtoken'); 

//Creo funcion verifyToken
const verifyToken = (req, res, next) => {
    try {
        const {authorization} = req.headers; // recupero el token x headers
         //Compruebo si el toquen existe en el header.
        if(!authorization) {
            return res.status(401).json(
                {
                    success: false,
                    message: "Token invalid"
                }
            );
        }
       
        //Con metodo split separo la palabra "bearer" del token y recupero solo el string del token
        const token = authorization.split(' ')[1];   
        
        // Esto comprueba que el token es valido con la firma correspondiente(el secreto)
        var decoded = jwt.verify(token, process.env.JWT_SECRET);
        
       
        

        // Si el decoded no es valido devuelvo un error
        if(!decoded){
            return res.status(401).json(
                {
                    success: false,
                    message: "Token invalid"
                }
            );
        }

        //Esto no entiendo pq me sirve, recupero id y role dentro del token?
        req.user_id = decoded.user_id;
        req.user_role = decoded.user_role;
        req.user_name = decoded.user_name
        req.user_surname = decoded.user_surname
        req.user_cf = decoded.user_cf
        req.user_mobile = decoded.user_mobile
        req.user_address = decoded.user_address
        req.user_city = decoded.user_city
        req.user_email = decoded.user_email


        // Si todo va bien, continuarà 
        next();  

        
    } catch (error) {
        return res.status(500).json(
            {
                success: false,
                message: "Invalid Token"
            }
        );
    }
}

//Exporto verifyToken
module.exports = verifyToken;