var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const bodyParser = require('body-parser')

const cors = require('cors');

const db = require("./db/db")

var indexRouter = require('./routes/index.js');
var usersRouter = require('./routes/users.js');
var columnsRouter = require('./routes/columns.js');

var app = express();

app.use(cors({origin: 'http://localhost:3000'}));

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

//body parser
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json());

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/columns', columnsRouter);

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
  res.status(err.status || 501).send('error');
});

<<<<<<< HEAD
app.listen(3001, function() {
  console.log("Up and running on port 3001")
=======
app.listen(3002, function() {
  console.log("Up and running on port 3002")
>>>>>>> 3030f5822e7cf5b02c46eab87971b2c8ea7a6202
})

module.exports = app;
