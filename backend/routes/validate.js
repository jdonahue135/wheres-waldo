var express = require("express");
var router = express.Router();

/* GET characters. */
router.get("/", function (req, res, next) {
  res.json([
    {
      name: "homer",
      x: 918,
      y: 383,
    },
    {
      name: "marge",
      x: 1017,
      y: 299,
    },
    {
      name: "lisa",
      x: 930,
      y: 529,
    },
    {
      name: "bart",
      x: 1094,
      y: 450,
    },
    {
      name: "maggie",
      x: 1135,
      y: 566,
    },
  ]);
});

module.exports = router;
