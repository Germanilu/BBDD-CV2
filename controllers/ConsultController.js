const Consult = require('../models/Consult');

const consultController = {};

//Create new consult
consultController.create = async(req,res) => {
    try {
        const {date,userMessage} = req.body;
        const userId = req.user_id
        const newConsult = {
            userId,
            date,
            userMessage
        }

        const consult = await Consult.create(newConsult)
        console.log(consult)
        return res.status(200).json(
            
            {
                success: true,
                message: "Consult created succesfully",
                data: newConsult
            }
            
        )
    } catch (error) {
        if(error?.message.includes('Cast to ObjectId failed')){
            return res.status(404).json(
                {
                    success: true,
                    messagge: "Unable Create a consult"

                }
            );
        }

        return res.status(500).json(
            {
                success: false,
                message: 'Unable to create a consult',
                error: error.message
            }
        )
    }
}


// Get all consult by user id
consultController.getByUserId = async(req,res) => {
   try {
    const userId = req.user_id;
    const allConsult = await Consult.find({userId})
    console.log(allConsult)

    if(!allConsult){
        return res.status(200).json(
            {
                success: true,
                message: 'You do not have any consult yet'
            }
        )
    }

    return res.status(200).json(
        {
            success: true,
            message: "Here all your consults",
            data:allConsult
        }
    )
   } catch (error) {
    return res.status(400).json(
        {
            success: false,
            message: 'Unable to get consults'
        }
    )
   }
}

//Delete consult
consultController.delete = async(req,res) => {
    try {
        const {id} = req.params;

        //find consult by id and check if vet already reply
        const consulta = await Consult.findById(id)
        console.log(consulta)

        if(consulta == null){
            return res.status(500).json({
                success: false,
                message: "Unable to delete consult "
            })
        }

        //if vet reply user not able to delete it
        if(consulta.vetId){
            return res.status(500).json({
                success: false,
                message: "Unable to delete consult "
            })
        }

        //if no user reply ---> delete
        await Consult.findByIdAndDelete(id);
        
    
        return res.status(200).json({
            success: true,
            message: "Your Consult has been deleted",
            })
         

    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Error detected, unable to delete consult",
            data: error?.message || error
        })
    }
}


//Vet reply to consult
consultController.reply = async(req,res) => {
    try {
        //Get data of consult id, vet id and body
        const {id} = req.params;
        const vetId = req.vet_id;
        const {vetMessage} = req.body

        //Get the consult 
       const consult = await Consult.findById(id)
        //Set the consult data
       consult.vetId = vetId
       consult.vetMessage = vetMessage
        //Save the consult
       await consult.save()

        return res.status(200).json(
            {
                success: true,
                message: "Reply Send succesfully",
            }
        )
    } catch (error) {
        return res.status(500).json(
            {
                success: false,
                message: "Unable to reply",
                error: error?.message || error
            }
        )
    }
}

//Get the consult reply by vet Id
consultController.getAllByVetId = async(req,res) => {
    try {
        const vetId = req.vet_id;
        const consult = await Consult.find({vetId:vetId})
        console.log(consult)
        return res.status(200).json(
            {
                success: true,
                message: "Retrive all consult by vet ID",
                data:consult
            }
        )


    } catch (error) {
        return res.status(500).json(
            {
                success: false,
                message: "Error retriving all consult",
                error: error?.message || error
            }
        )
    }
}

//Get all consult where there isn't vet ID ( Unreply Consults)
consultController.getAllConsultUnreply = async(req,res) => {
    try {
        const vetId = null;
        const consult = await Consult.find({vetId:vetId})

        return res.status(200).json(
            {
                success: true,
                message: "Retrive all consult unreply",
                data:consult
            }
        )

    } catch (error) {
         return res.status(500).json(
            {
                success: false,
                message: "Error retriving all consult unreply",
                error: error?.message || error
            }
        )
    }
}

//Get all consult (ADMIN)
consultController.getAll = async(req,res) => {
    try {
        const consult = await Consult.find()
        return res.status(200).json(
            {
                success: true,
                message: "Retrive all consult ",
                data:consult
            }
        )
    } catch (error) {
        return res.status(500).json(
            {
                success: false,
                message: "Error retriving all consult ",
                error: error?.message || error
            }
        )
    }
}

module.exports = consultController