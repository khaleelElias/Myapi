var express = require('express');
var router = express.Router();

const db = require("../db/db")

/* GET users listing. */
router.get('/', function(req, res, next) {

  let dataArray = [

    {name: "khaleel", age: 23},
    {name: "elias", age: 23},
    {name: "fahed", age: 12},
    {name: "robin", age: 45}
  ];

  res.json({

    data:dataArray
  })
});



module.exports = router;
