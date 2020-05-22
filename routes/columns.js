var express = require('express');
var router = express.Router();

const db = require("../db/db")

router.get('/', function(req, res, next)  {
  
  db.getAllColumns(function(error, columns) {
    if(error) {
      console.log(error)
      res.status(500).json({ error })
    } else
      res.status(200).json({ columns })
  })
})

router.post("/", function(req, res, next)  {
  const title = req.body.title
  const message = req.body.message
  const supervisor = req.body.supervisor

  db.createColumn(title, message, supervisor, function(error)  {
    if(error) {
      console.log(error)
      res.status(500).json({ error })
    } else
      res.status(200).json({ message: "DONE!" })
  })
})

module.exports = router;