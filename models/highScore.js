var mongoose = require("mongoose");

var Schema = mongoose.Schema;

var HighScoreSchema = new Schema({
  name: { type: String, required: true, max: 10 },
  seconds: { type: Number, required: true },
});

//Export model
module.exports = mongoose.model("HighScore", HighScoreSchema);
