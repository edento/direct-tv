"use strict";
// setup express app
var express = require('express');
var app = express();
var port = process.env.PORT || 6001;

app.use(express.static(__dirname + '/dist'));
// require('./routes')(app);

app.listen(port);
console.log('Listening on port ' + port);