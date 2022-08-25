//Conect User to model "user"
const User = require("../models/User");
// import bcrypt
const bcrypt = require('bcrypt');
// import jwt lib
const jwt = require('jsonwebtoken');


const Vet = require("../models/Vet");
const authController = {};

// User Create
authController.register = async (req, res) => {
    try {
        // Get body input
        const { name, surname, mobile, address, city, email, password } = req.body

        //Check necessary inputs
        if (!name || !email || !password) {
            return res.status(400).json(
                {
                    success: false,
                    message: "Name, email, password are required"
                }
            )
        }

        //Encrypt password    
        const salt = await bcrypt.genSalt(10);

        //Connect to encryptpasswd new has created
        const encryptedPassword = await bcrypt.hash(password, salt);
        //Passwd requirements
        if (password.length < 6 || password.length > 10) {
            return res.status(500).json(
                {
                    success: false,
                    message: 'La password deve comprendere tra 6 e 10 caratteri'
                }
            )
        }
        // Validation if user already exist
        const existUser = await User.find({email:email})
        if(existUser.length > 0 ){
            return res.status(500).json(
                {
                    success: false,
                    message: 'Usuario Già Registrato'
                }
            )
        }

        //Creating new user
        const newUser = {
            name,
            surname,
            mobile,
            address,
            city,
            email,
            password: encryptedPassword,
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
                message: 'Impossibile registrare usuario ',
                error: error?.message || RangeError
            }
        )
    }
};

//Login User
authController.login = async (req, res) => {

    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json(
                {
                    success: false,
                    message: 'Inserire Email e Password'
                }
            );
        }

        // Check if user or vet exist in model
        const user = await User.findOne({ email: email })
        const vet = await Vet.findOne({ email: email })

        //Validation
        if (!user && !vet) {
            return res.status(400).json(
                {
                    success: false,
                    message: 'Credenziali Errate'
                }
            );
        };

        //If vet, login
        if (!user) {
            const isValidPassword = bcrypt.compareSync(password, vet.password);

            if (!isValidPassword) {
                return res.status(401).json(
                    {
                        success: false,
                        message: 'Email o Password Errata'
                    }
                );
            }

            //Create vet token
            const token = await jwt.sign({
                user_id: vet._id,
                user_role: vet.role,
                user_name: vet.name,
                user_surname: vet.surname,
                user_email: vet.email
            }, process.env.JWT_SECRET, { expiresIn: '5h' })

            return res.status(200).json(
                {
                    success: true,
                    message: 'Vet Logged',
                    token: token
                }
            );

        } else {
            //Check if valida passwd
            const isValidPassword = bcrypt.compareSync(password, user.password);

            if (!isValidPassword) {
                return res.status(401).json(
                    {
                        success: false,
                        message: 'Email o Password Errata'
                    }
                );
            }


            //Creating User token
            const token = await jwt.sign({
                user_id: user._id,
                user_role: user.role,
                user_name: user.name,
                user_surname: user.surname,
                user_mobile: user.mobile,
                user_address: user.address,
                user_city: user.city,
                user_email: user.email
            }, process.env.JWT_SECRET, { expiresIn: '5h' });

            return res.status(200).json(
                {
                    success: true,
                    message: 'User Logged',
                    token: token
                }
            );
        }

    } catch (error) {
        return res.status(400).json(
            {
                success: false,
                message: 'User Failed'
            }
        )
    }
}

// Check profile
authController.profile = async (req, res) => {

    try {
        const userId = req.user_id

        //Find user and request to do not show passwd and version
        const user = await User.findOne({ _id: userId }).select(["-password", "-__v"])

        return res.status(200).json(
            {
                success: true,
                message: "User profile",
                data: user
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