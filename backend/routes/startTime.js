var express = require("express");
var router = express.Router();

router.get("/", function (req, res, next) {
  const startTime = new Date();
  res.json([startTime.getTime()]);
});

module.exports = router;
