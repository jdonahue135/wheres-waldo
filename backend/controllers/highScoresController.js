var HighScore = require("../models/highScore");

exports.highScores_List = function (req, res) {
  HighScore.find({}, "name seconds").exec(function (err, theScores) {
    if (err) {
      return next(err);
    }
    res.json(theScores);
  });
};
