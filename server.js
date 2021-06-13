var http = require('http');
var fs = require('fs');
var express = require('express');

var app = express();
app.all('/', function (req, res) {
    res.sendFile(__dirname+'./dist/index.html')
    res.send()
})
app.use(express.static( './dist'));

var server = app.listen(8080)
