const Vet = require('../models/Vet');
const bcrypt = require('bcrypt');
const vetController = {};

//Create new Vet
vetController.create = async (req, res) => {
    try {
        const { name, surname, specialization, email, password } = req.body;
        //Validation
        if (!name || !email || !password) {
            return res.status(400).json(
                {
                    success: false,
                    message: "Name, email, password are required"
                }
            )
        }

        //Codif passwd     
        const salt = await bcrypt.genSalt(10);

        //Connect codif passwd to new hash
        const encryptedPassword = await bcrypt.hash(password, salt);

        if (password.length < 6 || password.length > 10) {
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

//Get all Vet
vetController.getAll = async (req, res) => {
    try {
        const vet = await Vet.find();

        return res.status(200).json(
            {
                success: true,
                message: 'All Vets retrieved succsessfully',
                data: vet
            }
        );
    } catch (error) {
        return res.status(500).json(
            {
                success: false,
                message: 'Error retriving Vets',
                error: error.message
            }
        )
    }
}

//Get vet by ID
vetController.getVetById = async (req, res) => {
    try {
        const { id } = req.params;
        const vet = await Vet.findById(id);

        if (!vet) {
            return res.status(404).json
                (
                    {
                        success: true,
                        message: "Vet Not Found",
                        data: []
                    }
                )
        }

        return res.status(200).json(
            {
                success: true,
                message: "Vet found",
                data: vet
            }
        )
    } catch (error) {
        if (error?.message.includes('Cast to ObjectId failed')) {
            return res.status(404).json(
                {
                    success: true,
                    messagge: "Error Vet NOT Found"

                }
            );
        }
        return res.status(500).json(
            {
                success: false,
                messagge: "Error finding Vet",
                error: error?.message || error
            }
        )
    }
}

//Delete Vet
vetController.deleteById = async (req, res) => {
    try {
        const { id } = req.params;
        await Vet.findByIdAndDelete(id);

        return res.status(200).json(
            {
                success: true,
                message: "Vet deleted",
            }
        )
    } catch (error) {
        return res.status(500).json(
            {
                success: false,
                message: "Error, unable to delete Vet",
                error: error?.message || error
            }
        )
    }
}

module.exports = vetController;