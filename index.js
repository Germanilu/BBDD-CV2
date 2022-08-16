//Requiero express
const express = require('express'); 
//Cargo las variables de entorno
require('dotenv').config(); 
//Requiero database.js para que funcione el db de mongoose
const db = require('./config/database');  



//Connect to Auth Routes
const authRoutes = require('./routes/auth.routes');
const userRoutes = require('./routes/user.routes');


//conecto express a mi const app
const app = express(); 


//Analiza la request de entrada y pinta los datos en el body
app.use(express.json())  



//Puerto que utiliza el sv
const port = process.env.PORT || 4000; 


//Routes
app.use('/api', authRoutes);
app.use('/api', userRoutes)  


//ruta de bienvenida
app.get('/' , (req,res) => {   // Primera ruta creada 
    return res.send('Benvenuti alla Clinica Veterinaria Duemari')
});

// Si no encuentra la ruta indicada retorna un error 404
app.get('*', (req,res) => {
    return res.status(404).send('404 Route not found')
})



// Ejecuto db para que funcione database.js
db().then(() => {

    app.listen(port, () => {   
        console.log('server is running: ' + port);
    }) 
    }) 
    .catch((error) => {
        console.log("error connecting to mongoDB ", error)
    })
    