//Require Express
const express = require('express'); 
//Environment variability
require('dotenv').config(); 
//Require db 
const db = require('./config/database');  


//Connect to Auth Routes
const authRoutes = require('./routes/auth.routes');
const userRoutes = require('./routes/user.routes');
const petRoutes = require('./routes/pet.routes');
const bookingRoutes = require('./routes/booking.routes');
const vetRoutes = require('./routes/vet.routes');
const consultRoutes = require('./routes/consult.routes');

//conect express to app
const app = express(); 

//Check the entry request & create body data
app.use(express.json())  

//Port
const port = process.env.PORT || 4000; 

//Routes
app.use('/api', authRoutes);
app.use('/api', userRoutes);
app.use('/api', petRoutes);
app.use('/api', bookingRoutes);
app.use('/api',vetRoutes);
app.use('/api',consultRoutes);


//Welcome Rute
app.get('/' , (req,res) => {   
    return res.send('Benvenuti alla Clinica Veterinaria Duemari')
});

//If no rute, reject with 404
app.get('*', (req,res) => {
    return res.status(404).send('404 Route not found')
})

//Ejec. db to use database.js
db().then(() => {

    app.listen(port, () => {   
        console.log('server is running: ' + port);
    }) 
    }) 
    .catch((error) => {
        console.log("error connecting to mongoDB ", error)
    })
    