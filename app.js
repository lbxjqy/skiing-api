var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');

// sqlHeler
var SqlHelper = require('./dataHelper/sqlHelper');
SqlHelper.init(function(err, data) {
    if(err) {
      console.log(err)
    }
    else {
      console.log('SqlHelper.init' + "\r\n\r\n");
    }
});

var app = express();

app.use(function(req, res, next) {
	res.result = {
		"status": 10000,
		"data": "",
	};
	res.setHeader("Access-Control-Allow-Origin", "*");
	res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Content-Length, Authorization, Accept, X-Requested-With'); 
 	res.setHeader('Access-Control-Allow-Methods', 'POST, GET, OPTIONS');
	next();
});

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
	extended: false
}));
app.use(cookieParser());

app.use('/', indexRouter);
app.use('/users', usersRouter);

app.use(function(req, res, next) {
	if(res.result.data){
		res.setHeader("Content-Type", "application/json; charset=utf-8");
		res.end(JSON.stringify(res.result));
	}else{
		next();
	}
});

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
