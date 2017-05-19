var express = require('express');
var mongoose= require('mongoose');
var bodyParser = require('body-parser');
var path = require('path');
var multipart = require('connect-multiparty');
var passport =require('passport');
var cookieParser = require('cookie-parser');
var expressSession = require('express-session');
var flash = require('connect-flash');
var multipart = require('connect-multiparty');



//var fs = require('fs');



var routes = require('./routes/index')(passport);
var initPassport = require('./config/init');

mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost:27017/tacnik');


var multipartMiddleware = multipart();

var app = express();
//app.engine('html', require('ejs').renderFile);

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');





app.use(bodyParser.json());
app.use(multipartMiddleware);
app.use(bodyParser.urlencoded());
app.use(cookieParser());
app.use(multipartMiddleware);
app.use('/app',express.static(__dirname + "/app"));
app.use('/node_modules',express.static(__dirname + "/node_modules"));
app.use('/uploads',express.static(__dirname + "/uploads"));
app.use('/config',express.static(__dirname + "/config"));

var productsController = require('./server/controllers/product-controller');
app.use(expressSession({secret: 'mySecret'}));
app.use(passport.initialize());
app.use(passport.session());
app.use(flash());


/*app.use(app.router);*/

initPassport(passport);

app.use('/',routes);

/*app.post('/api/products/addProducts',productsController.addProducts);*/





app.listen('3000',function(){

	console.log("Server Listening on port 3000");

});

module.exports = app;


