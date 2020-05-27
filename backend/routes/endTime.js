var express = require("express");
var router = express.Router();

router.get("/", function (req, res, next) {
  const endTime = new Date();
  res.json([endTime.getTime()]);
});

module.exports = router;
