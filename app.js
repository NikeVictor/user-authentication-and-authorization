const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const jwt = require('jsonwebtoken');
const routes = require('./routes/route.js');
const connectDB = require('./db/connect');
const path = require('path');
require("dotenv").config()


const app = express();

app.use(express.static('./public'))
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// app.set("view engine", "ejs");

const PORT = 3000;

app.use(routes);

app.get ('/signup', function(req, res){
    res.sendFile(path.join(__dirname +'/public/home.html'));
  });  

// app.get ('/signup', function(req, res){
//     res.sendFile("home.html", { root: __dirname });
//   }); 

const start = async () => {
    try {
      await connectDB(process.env.MONGO_URI)     
      app.listen(PORT, console.log(`Server is listening on port ${PORT}...`))
    } catch (error) {
      console.log(error)
    }
}


start();