//Import lib. mongoose
const mongoose = require('mongoose');

//connection to MONGODB
const db = () => mongoose.connect(process.env.MONGO_URI) 
.then(() => {
    console.log('Connection stablished')
})
.catch((error) => {
    console.log('Error connection to MongoDB',error)
})

//Export db
module.exports = db 