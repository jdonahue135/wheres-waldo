// Get arguments passed on command line
var userArgs = process.argv.slice(2);
/*
if (!userArgs[0].startsWith('mongodb')) {
    console.log('ERROR: You need to specify a valid mongodb URL as the first argument');
    return
}
*/
var async = require("async");
var HighScore = require("./models/highScore");

var mongoose = require("mongoose");
var mongoDB = userArgs[0];
mongoose.connect(mongoDB, { useNewUrlParser: true });
mongoose.Promise = global.Promise;
var db = mongoose.connection;
db.on("error", console.error.bind(console, "MongoDB connection error:"));

var highScores = [];

function highScoreCreate(name, seconds, cb) {
  highScoreDetail = {
    name: name,
    seconds: seconds,
  };
  var highScore = new HighScore(highScoreDetail);

  highScore.save(function (err) {
    if (err) {
      cb(err, null);
      return;
    }
    console.log("New High Score: " + highScore);
    highScores.push(highScore);
    cb(null, highScore);
  });
}

function createHighScores(cb) {
  async.series(
    [
      function (callback) {
        highScoreCreate("Patrick", 122, callback);
      },
      function (callback) {
        highScoreCreate("Ben", 300, callback);
      },
      function (callback) {
        highScoreCreate("Isaac", 130, callback);
      },
      function (callback) {
        highScoreCreate("Bob", 667, callback);
      },
      function (callback) {
        highScoreCreate("Jim", 1, callback);
      },
    ],
    // optional callback
    cb
  );
}

async.series(
  [createHighScores],
  // Optional callback
  function (err, results) {
    if (err) {
      console.log("FINAL ERR: " + err);
    } else {
      console.log("HighScores: " + highScores);
    }
    // All done, disconnect from database
    mongoose.connection.close();
  }
);
