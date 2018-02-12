require('dotenv').config();
// dependencies
var express = require('express');
var bodyParser = require('body-parser');
var path = require('path');
var engines = require('consolidate');
var mongo = require('mongodb');
const favicon = require('express-favicon');
// varijable
const PORT = process.env.PORT || 3000; // or app.set('port', port);
//routes
var index = require('./routes/index');



var app = express();

// config
app.set('views', __dirname + '/views'); // result: soft_\views
app.engine('html', engines.mustache); // for html engines , mustache, hogan
app.set('view engine', 'html'); // set html engine

//app.use(favicon(path.join(__dirname,'public','favicon.ico'))); // app.use(favicon(path.join(__dirname,'public','images','favicon.ico'));


// this will let us get the data from a POST
app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(bodyParser.json());

// To use Express router
app.use('/', index);



/*
// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = process.env.NODE_ENV  === 'development' ? err : {}; // req.app.get('env')

  // render the error page
  res.status(err.status || 500);
  console.log(res.status);
  res.render('error');
});
*/
app.listen(PORT, function(){
	console.log("Server poceo sa radom na portu 3000");
});

module.exports = app;



