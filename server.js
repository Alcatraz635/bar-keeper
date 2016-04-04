// set up ========================
var express  = require('express');
var app      = express();
var mongoose = require('mongoose');
var morgan = require('morgan');
var bodyParser = require('body-parser');
var methodOverride = require('method-override');

// configuration =================
mongoose.connect('mongodb://tylerschumacher635:heidi225@ds021289.mlab.com:21289/bar-keeper-drinks');     // connect to mongoDB database on modulus.io

//app.use(express.static(__dirname + '/public'));
app.use(morgan('dev'));
app.use(bodyParser.urlencoded({'extended':'true'}));
app.use(bodyParser.json());
app.use(bodyParser.json({ type: 'application/vnd.api+json' }));
app.use(methodOverride());
app.use(express.static(__dirname + '/client'));
app.set('views', './client'); 
app.engine('html', require('ejs').renderFile);
app.set('view engine', 'html');

//routes
require('./server/routes.js')(app);
// listen (start app with node server.js) ======================================
app.listen(3000);
console.log("App listening on port 3000");

	//set root view
app.get('/', function(req, res) {
         res.render('index.html');
    });
