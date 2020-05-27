var express = require("express");
var router = express.Router();

var highScoresController = require("../controllers/highScoresController");

router.get("/", highScoresController.highScores_List);

module.exports = router;
