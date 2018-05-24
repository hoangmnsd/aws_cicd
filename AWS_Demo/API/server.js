var express = require('express');
var bodyparser = require('body-parser');

// var port = process.env.PORT || 3000;

// Init connect, fix permission
var connection = require('./mySQLConnection');
var cors = require('./crossPermission');
// Declare Routes
var router_student = require('./routes/routes_Student');
var router_searchstudent = require('./routes/routes_Search');

// Display json style
var app = express();
app.use(bodyparser.urlencoded({ extended: true }));
app.use(bodyparser.json());

// Using Routes
app.use(cors.permission);
app.use('/api/student', router_student);
app.use('/api/searchstudent', router_searchstudent);

// http://localhost:3000/
var server = app.listen(3000, '0.0.0.0', function () {
  console.log('Server listening, open your browser on http://localhost:' + server.address().port);
});

module.exports = app;