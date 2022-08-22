//Check if superAdmin
const isSuperAdmin = (req, res, next) => {

    try {
        //Validastion if no super_admin role reject
        if (req.user_role !== "super_admin") {
            return res.status(200).json(
                {
                    success: false,
                    message: "don't have user permission "
                }
            );
        }
        //if validation pass, continue.
        next()

    } catch (error) {
        return res.status(500).json(
            {
                success: false,
                message: "don't have user permission"
            }
        );
    }
};

//Export isSuperAdmin
module.exports = isSuperAdmin