var express = require('express');
var router = express.Router();

const db = require("../db/db")

/* GET users listing. */
router.get('/', function(req, res, next) {
  const id = req.query.id

  if(id != null)  {
    db.getAdminById(id, function(error, user) {
      if(error) 
        res.status(500).json({ error })
      else if (!user)
        res.status(500).json({ error })
      else
        res.status(200).json({ user })
    })
  } else  {
    db.getAllAdmins(function(error, users)  {
      if(error) 
        res.status(500).json({ error })
      else if (!users)
        res.status(500).json({ error })
      else
        res.status(200).json({ users })
    })
  }
})

router.post('/', function(req, res, next) {
  const username = req.body.username
  const status = req.body.status
  
  db.createAdmin(username, status, function(error) {
    if(error) {
      res.status(500).json({ error })
    } else
      res.status(200).json({ message: "Created successfully! "})
  }) 
});

router.delete('/', function(req, res, next)  {
  const id = req.body.id

  db.deleteUserById(id, function(error) {
    if(error) 
      res.status(500).json({ error })
    else
      res.status(200).json({ message: "Deleted successfully!" })
  })
})

router.put('/status', function(req, res, next)  {
  const id = req.body.id
  const status = req.body.status
    
  if(id != null)  {
    db.updateStatus(id, status, function(error) {
      if(error) 
        res.status(500).json({ error })
      else
        res.status(200).json({ })
    })
  } else
    res.status(100).json({ error: "Wrong ID" })
})



module.exports = router;
