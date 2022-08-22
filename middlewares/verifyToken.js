//Import JwToken
const jwt = require('jsonwebtoken');

//Create verifyToken
const verifyToken = (req, res, next) => {
    try {
        //Get token by headers
        const { authorization } = req.headers;
        //Validation if token exist 
        if (!authorization) {
            return res.status(401).json(
                {
                    success: false,
                    message: "Token invalid"
                }
            );
        }

        //Split "Bearer from token"
        const token = authorization.split(' ')[1];

        //Validation if token is valid with correct Secret
        var decoded = jwt.verify(token, process.env.JWT_SECRET);

        // Validation if decoded is valid.
        if (!decoded) {
            return res.status(401).json(
                {
                    success: false,
                    message: "Token invalid"
                }
            );
        }

        //Insert data into token
        req.user_id = decoded.user_id;
        req.user_role = decoded.user_role;
        req.user_name = decoded.user_name
        req.user_surname = decoded.user_surname
        req.user_cf = decoded.user_cf
        req.user_mobile = decoded.user_mobile
        req.user_address = decoded.user_address
        req.user_city = decoded.user_city
        req.user_email = decoded.user_email

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

//Export verifyToken
module.exports = verifyToken;