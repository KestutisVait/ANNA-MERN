var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const cors = require('cors');
const DbConnection = require('./db/conn');
const DbInitialization = require('./db/init');
const multer = require('multer');


var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var adminRouter = require('./routes/admin');
var navigationRouter = require('./routes/navigation');
var slidesRouter = require('./routes/slides');
var articleRouter = require('./routes/article');
var eventsRouter = require('./routes/events');

var app = express();

app.use(cors());

DbConnection();
DbInitialization();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use('/images', express.static(path.join(__dirname, 'public', 'images')));


app.use(multer({ dest: "uploads/" }).single("image"));

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/api/admin', adminRouter);
app.use('/api/nav', navigationRouter);
app.use('/api/slides', slidesRouter);
app.use('/api/articles', articleRouter);
app.use('/api/events', eventsRouter);

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => console.log(`Server started on port ${PORT}`));

// module.exports = app;
