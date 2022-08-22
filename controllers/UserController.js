const User = require("../models/User");
const bcrypt = require('bcrypt');
const userController = {};

//Get all users
userController.getAll = async (req, res) => {
    try {
        const users = await User.find();

        return res.status(200).json(
            {
                success: true,
                message: 'All users retrieved succsessfully',
                data: users
            }
        );
    } catch (error) {
        return res.status(500).json(
            {
                success: false,
                message: 'Error retriving users',
                error: error.message
            }
        )
    }
};

// Get by user id
userController.getUserById = async (req, res) => {

    try {
        const { id } = req.params;
        const user = await User.findById(id)
        //Validation
        if (!user) {
            return res.status(404).json
                (
                    {
                        success: true,
                        message: "User NOT found",
                        data: []
                    }
                )
        }

        return res.status(200).json(
            {
                success: true,
                message: "User found",
                data: user
            }
        )
    } catch (error) {
        if (error?.message.includes('Cast to ObjectId failed')) {
            return res.status(404).json(
                {
                    success: true,
                    messagge: "Error User NOT Found"

                }
            );
        }
        return res.status(500).json(
            {
                success: false,
                messagge: "Error finding user",
                error: error?.message || error
            }
        )
    }
};

//Delete user by id
userController.deleteById = async (req, res) => {

    try {
        const { id } = req.params;
        //Validation to avoid user able to delete other users
        if (id !== req.user_id) {
            return res.status(200).json(
                {
                    success: true,
                    message: "Unable to delet user, user not found",
                }
            )
        }

        await User.findByIdAndDelete(id)
        return res.status(200).json(
            {
                success: true,
                message: "User deleted",
            }
        )
    } catch (error) {
        return res.status(500).json(
            {
                success: false,
                message: "Unable to delete user, user not found",
                error: error?.message || error
            }
        )
    }
}

//Update user data
userController.update = async (req, res) => {
    try {
        const { id } = req.params;
        if (req.body.name === "") {
            return res.status(400).json(
                {
                    success: false,
                    message: "Unable to update, missing data "
                }
            )
        }

        const { name, surname, cf, mobile, address, city, email, password } = req.body

        //Codif. passw     
        const salt = await bcrypt.genSalt(10);
        //Connect codif passw to new hash
        const encryptedPassword = await bcrypt.hash(password, salt);

        const updateUser = {
            name,
            surname,
            cf,
            mobile,
            address,
            city,
            email,
            password: encryptedPassword,
        }

        await User.findOneAndUpdate({ _id: id }, updateUser)
        return res.status(200).json(
            {
                success: true,
                message: "User Update Succesfully",
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

//Update Role (ADMIN)
userController.updateRole = async (req, res) => {
    try {
        const { id } = req.params;
        const role = req.body;
        await User.findOneAndUpdate({ _id: id }, role)

        return res.status(200).json(
            {
                success: true,
                message: "User Update Succesfully",
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

module.exports = userController;

