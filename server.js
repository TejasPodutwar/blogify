const path = require("path");
const express = require("express");
const morgan = require("morgan");
const mongoose = require("mongoose");
const blogRoutes = require("./routes/blogroutes");
const authRoutes = require("./routes/authRoutes");
const dotenv = require("dotenv");
const cookieParser = require('cookie-parser');
const {requireAuth, isUser} = require('./middleware/authmiddleware');


//express application
const app = express()
dotenv.config({path: 'config.env'});
const PORT = process.env.PORT || 7000;

//connecting to the database
mongoose.connect(process.env.DB_URL,{useNewUrlParser: true, useUnifiedTopology: true})
.then((result) =>{
    console.log("Connection to the database successful...");
})
.catch((err) => {
    console.log("Unable to connect to the db...");
})


//setting ejs as the view engine
app.set("view engine",'ejs');

//logger for the request
app.use(morgan("dev"));

//middleware for the permission to access the files inside the public folder
app.use(express.static("public"));
app.use(express.urlencoded({extended: true}));
app.use(express.json());
app.use(cookieParser());

//routes
app.get('*',isUser);
app.get('/',(req,res) => {
    res.redirect('/blogs');
});

//blog routes
app.use('/blogs',blogRoutes);
app.use('/auth',authRoutes);

app.get('/about',(req,res) => {
    res.render("newabout" , { title: "About Us"});
});

app.use((req,res) => {
    res.render("404", { title: "404"});
});

//Listening to the server
app.listen(PORT,() => {
    console.log(`Listening to port number ${PORT}...`);
    console.log(`Visit: http://localhost:${PORT}/`)
})

