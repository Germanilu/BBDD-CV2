const Vet = require('../models/Vet');
const bcrypt = require('bcrypt'); 
// importo la libreria del jsonweb token 
const jwt = require('jsonwebtoken'); 
const vetController = {};

vetController.create = async (req,res) => {
    try {
        const {name,surname,specialization,email,password} = req.body;

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

        const newVet = {
            name,
            surname,
            specialization,
            email,
            password: encryptedPassword
        }

        await Vet.create(newVet)

        return res.status(200).json(
            {
            success: true,
            message: 'Create Vet successfully'
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
}


vetController.login = async(req,res) => {
    try {
        const {email,password} = req.body
        if(!email || !password){
            return res.status(400).json(
                {
                    success: false,
                    message: 'Email and password are required'
                }
            );
        }
    } catch (error) {
        
    }
}


module.exports = vetController;