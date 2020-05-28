var HighScore = require("../models/highScore");

exports.highScores_List = function (req, res) {
  HighScore.find({}, "name seconds").exec(function (err, theScores) {
    if (err) {
      return next(err);
    }
    res.json(theScores);
  });
};

exports.highScore_post = function (req, res) {
  HighScore.find({}, "").exec(function (err, theScores) {
    if (err) {
      return next(err);
    }
    theScores.sort(sortHighScores);
    theScores[4].name = req.body.name;
    theScores[4].seconds = req.body.seconds;
    HighScore.findByIdAndUpdate(theScores[4].id, theScores[4]).exec(function (
      err,
      theScore
    ) {
      if (err) {
        res.json("high score not posted");
        return next(err);
      } else {
        res.json("high score posted");
      }
    });
  });
};

const sortHighScores = (a, b) => {
  if (a.seconds < b.seconds) {
    return -1;
  } else {
    return 1;
  }
};
