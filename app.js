// LOAD MODULES 
var express = require("express"),
    app = express(),
    bodyParser = require('body-parser'),
    mongoose = require('mongoose'),
    path = require('path'),
    DataLibrary = require('./models/datalibrary')

var showRoutes = require('./routes/show'),
    indexRoutes = require('./routes/index'),
    datalibraryRoutes = require('./routes/datalibrary'),
    vizRoutes = require('./routes/viz'),
    downloadsRoutes = require('./routes/downloads')

app.use(bodyParser.json());
app.use(express.json());
app.set("view engine", "ejs"); // use ejs template engine for rendering

mongoose.connect('mongodb://localhost/datalibrary',
    { useUnifiedTopology: true, useNewUrlParser: true }, function (err) {
        if (err) { console.log('Not connected to database!'); } else {
            console.log('Successfully connected to database.')
        }
    }
);

// // TELL EXPRESS TO USE THE FOLLOWING LIBRARIES/FILES/ROUTES DEFINED IN ROUTES FOLDER
app.use('/tasks', express.static(__dirname + "/tasks"));
app.use('/surveys', express.static(__dirname + "/surveys"));
app.use('/studies', express.static(__dirname + "/studies"));
app.use('/jsPsych', express.static(__dirname + "/jsPsych"));
app.use('/libraries', express.static(__dirname + "/libraries"));
app.use('/public', express.static(__dirname + "/public"));

app.use(indexRoutes); // TODO Maham: work on index routes
app.use(datalibraryRoutes);
app.use(showRoutes);
app.use(vizRoutes);
// app.use(downloadsRoutes); // TODO Maham: work on download routes

// Handle 404
app.use(function (req, res) {
    // res.redirect("/"); // redirect to homepage
    res.redirect('/public/404.html'); // works but not the right way?
    // res.render("404.ejs");
});

// Handle 500
app.use(function (error, req, res, next) {
    res.redirect('/public/500.html'); // works but not the right way?
    // res.render('500.ejs');
});

// START SERVER
app.listen(8080);
console.log("Server started on port 8080");