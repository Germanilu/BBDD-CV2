//Conecto la const User con mi modelo
const User = require("../models/User");
// importo libreria para encriptar
const bcrypt = require('bcrypt'); 
// importo la libreria del jsonweb token 
const jwt = require('jsonwebtoken'); 
//Creo un objeto vacio y conecto a la constante
const authController = {};

// CREACION DE USUARIO
authController.register = async (req,res) => {
    
    try {
        // almaceno todo lo de req.body 
        const {name, surname, cf, mobile, address, city, email, password } = req.body  
        
        //Validar campos introducidos (si falta algo no puedo crear el usuario)
        if(!name || !email || !password){
            return res.status(400).json(
                {
                    success: false,
                    message: "Name, email, password are required"
                }
            )
        }

        //Codificacion password       
        const salt = await bcrypt.genSalt(10);
        //Conecto a mi encryptedPassword el nuevo hash creado.
        const encryptedPassword = await bcrypt.hash(password, salt);
        
        if(password.length < 6 || password.length > 10){
            return res.status(500).json(
                {
                    success: false,
                    message: 'Password is shorter than 6 character'
                }
            )
        }
        
        const newUser = {
            name,
            surname,
            cf,
            mobile,
            address,
            city,
            email,
            password: encryptedPassword
            
        }

        await User.create(newUser)
        return res.status(200).json(
            {
            success: true,
            message: 'Create user successfully'
            }
        )
    } catch (error) {
        return res.status(500).json(
            {
            success: false,
            message: 'Error creating user: ',
            error: error?.message || RangeError
            }
        )
    }
};

//LOGIN DE USUARIO
authController.login = async (req,res) => {

    try {
        const { email, password} = req.body;
        
        if(!email || !password){
            return res.status(400).json(
                {
                    success: false,
                    message: 'Email and password are required'
                }
            );
        }

        // Busco si el usuario existe
        const user = await User.findOne({email: email})  
       
        console.log(user.name)
        
        if(!user){
            return res.status(400).json(
                {
                    success: false,
                    message: 'Bad Credentials'
                }
            );
        };

        //Reviso si el passw es valido
        const isValidPassword = bcrypt.compareSync(password, user.password);

       
        
        if(!isValidPassword){
            return res.status(401).json(
                {
                    success: false,
                    message: 'Bad credential'
                }
            );
        }

        

       //aqui creo mi jsonwebtoken
        const token = await jwt.sign({
            user_id : user._id,
            user_role: user.role,
            user_name: user.name,
            user_surname: user.surname,
            user_cf: user.cf,
            user_mobile: user.mobile,
            user_address: user.address,
            user_city: user.city,
            user_email: user.email
        }, process.env.JWT_SECRET, { expiresIn: '5h' });

        console.log(token)
        return res.status(200).json(
            {
                success: true,
                message: 'User Logged',
                token: token 
            }
        );

    } catch (error) {
        return res.status(400).json(
            {
                success: false,
                message: 'User Failed'
            }
        )
    }
}

// Metodo para revisar el perfil
authController.profile = async (req,res) => {

    try {
        
        const userId = req.user_id
        console.log(userId)
        //Esto me sirve para que enseñe el perfil del token que esta haciendo la busqueda y que me esconda la password (.select(["-password"]))
        // Si no pongon _id me devolvera siempre el perfil del superadmin 
        const user = await User.findOne({_id: userId}).select(["-password", "-__v"])

        return res.status(200).json(
            {
                success: true,
                message: "User profile",
                data:user
            }
        )

    } catch (error) {
        return res.status(400).json(
            {
                success: false,
                message: 'User profile failed'
            }
        )
    }
}

module.exports = authController;