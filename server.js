const express = require('express');
const colors = require('colors');
require('dotenv').config()
const morgan = require('morgan');
const connectDB = require('./config/db');
connectDB();

const app = express();
app.use(express.json());
app.use(morgan('dev'));

//Rest api

auth_router = require("./routes/authRoute");
app.use('/api/v1/auth', auth_router);


const PORT = process.env.PORT 
//Listen
app.listen(PORT, ()=>{
    console.log(`Server engaged on port ${PORT}`.bgCyan.white);
})