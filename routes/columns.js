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
  const type = req.body.type

  db.createColumn(title, message, supervisor, type, function(error)  {
    if(error) {
      res.status(500).json({ error })
    } else
      res.status(200).json({ message: "Created successfully!" })
  })
})

router.put("/", function(req, res, next)  {
  const id = req.body.id
  const title = req.body.title
  const message = req.body.message
  const supervisor = req.body.supervisor
  const type = req.body.type

  if(id != null)  {
    db.updateColumn(id, title, message, supervisor, type, function(error) {
      if(error) {
        res.status(500).json({ error })
      } else
        res.status(200).json({ message: "Updated successfully!"})
    })
  } else
    res.status(400).json({ message: "NO ID!"})
})

router.delete("/", function(req, res, next) {
  const id = req.body.id

  if(id != null)  {
    db.deleteColumn(id, function(error) {
      if(error) {
        res.status(500).json({ error })
      } else
        res.status(200).json({ message: "Deleted successfully!" })
    })
  } else
    res.status(400).json({ error: "NO ID!"})
})

module.exports = router;