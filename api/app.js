var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const cors = require('cors');
const DbConnection = require('./db/conn');
const DbInitialization = require('./db/init');


var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var adminRouter = require('./routes/admin');
var navigationRouter = require('./routes/navigation');
var slidesRouter = require('./routes/slides');

var app = express();

app.use(cors());

DbConnection();
DbInitialization();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/api/admin', adminRouter);
app.use('/api/nav', navigationRouter);
app.use('/api/slides', slidesRouter);

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => console.log(`Server started on port ${PORT}`));

// module.exports = app;
