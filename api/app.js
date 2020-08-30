var createError = require('http-errors');
var express = require('express');
var cors = require('cors');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
var getPostsRouter = require("./routes/getPosts");
var getPostRouter = require("./routes/getPost");
var postPostRouter = require("./routes/postRelatedPosts");
var getCategoriesRouter = require("./routes/getCategories");
var getTagsRouter = require("./routes/getTags");

var app = express();

app.use(cors());
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use("/posts", getPostsRouter);
app.use("/post", getPostRouter);
app.use("/related", postPostRouter);
app.use("/categories", getCategoriesRouter);
app.use("/tags", getTagsRouter);

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
