var express = require('express');
var app = express();

var auth = require('http-auth');
var basic = auth.basic({
	realm: "Simon Area.",
	file: __dirname + "/users.htpasswd"
});
// un: andy  pw: warhol


app.set('port', (process.env.PORT || 5000));

app.use(express.static(__dirname + '/public'));

// views is directory for all template files
app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');


app.get('/admin', auth.connect(basic), function(request, response) {
    response.render('index');
});

app.get('/', function(request, response) {
  response.render('owl');
});

app.listen(app.get('port'), function() {
  console.log('Node app is running on port', app.get('port'));
});


