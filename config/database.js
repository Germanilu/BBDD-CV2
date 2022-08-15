const mongoose = require('mongoose');// importo libreria de mongoose para que  funcione mongoose

//connection to MONGODB
const db = () => mongoose.connect(process.env.MONGO_URI) // aqui ejecuto la coneccion a mongoose, esto lo que me devuelve es una promesa y la uso con .then o .catch (/test es lo que voy a atacar en mi base de datos puedo cambiarla)
.then(() => {
    console.log('Connection stablished')
})
.catch((error) => {
    console.log('Error connection to MongoDB',error)
})

module.exports = db // Exporto la constante db con dentro la ejecucion de mongoose.