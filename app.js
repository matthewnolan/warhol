// var https = require('https');
var express = require('express')
var app = express();
// var Parse = require('parse');
// var url = require('url');
// var request = require('request');
// var Q = require('q');

app.set('view engine', 'ejs');
app.use(express.static(__dirname + '/public'));


app.get('/', function(req, res) {
    res.render('index');
})

app.listen(3000);


