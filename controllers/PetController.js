const Pet = require('../models/Pet');
const petController = {};

//Register pet
petController.register = async (req, res) => {
    try {
        const { name, type, breed, age, weight, diseases } = req.body;
        //Connect the userId to the pet
        const userId = req.user_id;
        //Validation
        if (!name || !type || !age || !weight) {
            return res.status(400).json({
                success: false,
                message: "Nome, Specie, Età, Peso sono campi obbligatori"
            })
        }

        const newPet = {
            userId,
            name,
            type,
            breed,
            age,
            weight,
            diseases
        }

        await Pet.create(newPet);

        return res.status(200).json({
            success: true,
            message: 'Pet created successfully'
        })

    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Sembra ci sia stato un'errore",
            error: error?.message || RangeError
        })
    }
}

//Delete Pet
petController.deleteById = async (req, res) => {
    try {
        const { id } = req.params;
        await Pet.findByIdAndDelete(id)

        return res.status(200).json({
            success: true,
            message: "Pet deleted succesfully"
        })

    } catch (error) {
        return res.status(500).json(
            {
                success: false,
                message: "Unable to delete pet, pet not found",
                error: error?.message || error
            }
        )
    }
}

//Update Pet
petController.update = async (req, res) => {
    try {
        const { id } = req.params;

        //Check if missing data
        if ( req.body.diseases === "" || req.body.weight === "") {
            return res.status(400).json({
                success: false,
                message: "Devi prima inserire un nuovo valore"
            })
        }

        const {  weight, diseases } = req.body;
        const updatePet = {
            weight,
            diseases
        }

        await Pet.findOneAndUpdate({ _id: id }, updatePet)
        return res.status(200).json(
            {
                success: true,
                message: "Pet Update Succesfully"
            }
        )
    } catch (error) {
        return res.status(500).json(
            {
                success: false,
                message: "Unable to Update Data",
                error: error?.message || error
            }
        )
    }
}

//Get pets own by user
petController.getMyPets = async (req, res) => {
    try {
        const userId = req.user_id
        const pets = await Pet.find({ userId: userId })
        return res.status(200).json(
            {
                success: true,
                message: "Here all your Pets",
                data: pets
            }
        )
    } catch (error) {
        return res.status(500).json(
            {
                success: false,
                message: "Unable to retrive your pets",
                error: error?.message || error
            }
        )
    }
}

//Get all existing pets
petController.getAll = async (req, res) => {
    try {
        const pets = await Pet.find()

        return res.status(200).json(
            {
                success: true,
                message: "Pet Update Succesfully",
                data: pets
            }
        )

    } catch (error) {
        return res.status(500).json(
            {
                success: false,
                message: "No pets registered in the DB",
                error: error?.message || error
            }
        )
    }
}

//Get pet by id
petController.getPetById = async (req, res) => {
    try {

        const { id } = req.params;
        const pet = await Pet.findById(id)

        return res.status(200).json(
            {
                success: true,
                message: "Pet retrived succesfully",
                data: pet
            }
        )

    } catch (error) {
        return res.status(500).json(
            {
                success: false,
                message: "Doesn't exist any pet with this id",
                error: error?.message || error
            }
        )
    }
}

//Get pets by user ID
petController.getByUserId = async (req, res) => {
    try {
        const { userId } = req.params;

        const pets = await Pet.find({ userId: userId });

        if (pets.length === 0) {
            return res.status(500).json(
                {
                    success: false,
                    message: 'User do not have any pet registered yet',
                }
            )
        }
        return res.status(200).json(
            {
                success: true,
                message: 'All pets retrived succsesfully',
                data: pets
            }
        )
    } catch (error) {
        return res.status(500).json(
            {
                success: false,
                message: 'Error retriving pets',
                error: error.message
            }
        )
    }
}

module.exports = petController