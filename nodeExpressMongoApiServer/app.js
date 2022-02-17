const express = require('express');
const mongoose = require('mongoose');
require('dotenv').config();
const userRoutes = require('./routes/userRoutes');
const smsRoutes = require('./routes/smsRoutes')
const authRouter = require('./routes/authRoutes');
const devicesRoutes = require('./routes/devicesRoutes');
const bodyParser = require ('body-parser');

const app = express();

//Middlewares
app.use(bodyParser.json());
app.use("/devices", devicesRoutes);
app.use("/auth", authRouter);
app.use('/users', userRoutes);
app.use('/sms', smsRoutes);


//mongodb connection
 mongoose.connect(process.env.DB_URI)
 .then((result) => app.listen(3000))
 .catch((err) => console.log(err))


app.get('/', (req, res) =>{
    res.send('working!');
})


