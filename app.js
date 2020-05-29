var createError = require("http-errors");
var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");

var indexRouter = require("./routes/index");
var usersRouter = require("./routes/users");
var validateRouter = require("./routes/validate");
var startTimeRouter = require("./routes/startTime");
var endTimeRouter = require("./routes/startTime");
var highScoresRouter = require("./routes/highScores");

var app = express();

//Set up mongoose connection
var mongoose = require("mongoose");
var mongoDB =
  "mongodb+srv://user:user@cluster0-kvpi2.mongodb.net/test?retryWrites=true&w=majority";
mongoose.connect(mongoDB, { useNewUrlParser: true });
var db = mongoose.connection;
db.on("error", console.error.bind(console, "MongoDB connection error:"));

// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "jade");

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "client/build")));
/*app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname + "/client/build/index.html"));
});*/

app.use("/", indexRouter);
app.use("/users", usersRouter);
app.use("/validate", validateRouter);
app.use("/startTime", startTimeRouter);
app.use("/endTime", endTimeRouter);
app.use("/highScores", highScoresRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render("error");
});

module.exports = app;
