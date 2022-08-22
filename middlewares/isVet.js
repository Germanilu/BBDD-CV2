//Check if Vet
const isVet = (req, res, next) => {

    try {
        //Validation, if it's user, reject.
        if (req.user_role === "user") {

            return res.status(200).json(
                {
                    success: false,
                    message: "don't have vet permission "
                }
            );
        }
        //If validation ok, continue.
        next()

    } catch (error) {
        return res.status(500).json(
            {
                success: false,
                message: "don't have vet permission"
            }
        );
    }
};

//Export Vet
module.exports = isVet