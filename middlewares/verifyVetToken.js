//Importo jsonwebtoken
const jwt = require('jsonwebtoken'); 

//Creo funcion verifyToken
const verifyVetToken = (req, res, next) => {
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
        req.vet_id = decoded.vet_id;
        req.vet_role = decoded.vet_role;
        req.vet_name = decoded.vet_name
        req.vet_surname = decoded.vet_surname
        req.vet_email = decoded.vet_email


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
module.exports = verifyVetToken;