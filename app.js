var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const bodyParser = require('body-parser')
const cors = require('cors');

const db = require("./db/db")

const indexRouter = require('./routes/index.js');
const usersRouter = require('./routes/users.js');
const columnsRouter = require('./routes/columns.js');
const ordersRouter = require('./routes/orders.js');
const checksRouter = require('./routes/checks.js');
const projectsRouter = require('./routes/project.js');

const app = express();

app.use(cors({origin: 'http://localhost:3001'}));

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
app.use('/orders', ordersRouter);
app.use('/checks', checksRouter);
app.use('/projects', projectsRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};
  
  console.log(err)

  // render the error page
  res.status(err.status || 501).send('error');
});

app.listen(3000, function() {
  console.log("Up and running on port 3000")
})

module.exports = app;
