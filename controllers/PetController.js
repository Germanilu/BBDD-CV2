const Pet = require('../models/Pet');
const petController = {};

petController.register = async (req,res) => {
    try {
        const {name,type, breed, age, weight, diseases} = req.body;
        //Connect the userId to the pet
        const userId = req.user_id;

        if(!name || !type || !breed || !age || !weight){
            return res.status(400).json({
                success: false,
                message: "Name, type, breed, age or weight information missing"
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
            message: 'Error creating pet',
            error: error?.message || RangeError
        })
    }
}


petController.deleteById = async(req,res) => {
    try {
        const {id} = req.params;

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


module.exports = petController