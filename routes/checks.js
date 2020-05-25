var express = require('express');
var router = express.Router();

const db = require("../db/db")

router.get("/", function(req, res, next)    {
    const columnId = req.query.columnId
    const id = req.query.id

    if(id != null || id != "")  {
        db.getCheckById(id, function(error, check)  {
            if(error)
                res.status(500).json({ error })
            else
                res.status(200).json({ check })
        })
    }   else if(columnId != null || columnId != "") {
        db.getChecksByColumnId(columnId, function(error, checks)    {
            if(error)
                res.status(500).json({ error })
            else
                res.status(200).json({ checks })
        })
    }   else    {
        db.getAllChecks(function(error, checks) {
            if(error)
                res.status(500).json({ error })
            else
                res.status(200).json({ checks })
        })
    }
})

router.post("/", function(req, res, next)   {
    const title = req.body.title
    const status = req.body.status
    const columnId = req.body.columnId

    db.createCheck(title, status, columnId, function(error) {
        if(error)
            res.status(500).json({ error })
        else
            res.status(200).json({ message: "Created successfully!" })
    })
})

router.put("/", function(req, res, next)    {
    const id = req.body.id
    const title = req.body.title
    const status = req.body.status
    const columnId = req.body.columnId

    db.updateCheckById(id, title, status, columnId, function(error) {
        if(error)
            res.status(500).json({ error })
        else
            res.status(200).json({ message: "Updated Successfully!" })
    })
})

router.delete("/", function(req, res, next) {
    const id = req.body.id
    const columnId = req.body.columnId

    if(id != null || id != "")  {
        db.deleteCheck(id, function(error)  {
            if(error)  
                res.status(500).json({ error })
            else
                res.status(200).json({ message: "Deleted successfully!" })
        })
    }   else if(columnId != null || columnId != "") {
        db.deleteChecksByColumnId(columnId, function(error) {
            if(error)   
                res.status(500).json({ error })
            else
                res.status(200).json({ message: "Deleted successfully!" })
        })
    }   else
        res.status(400).json({ message: "NO ID or columnId!" })
})


module.exports = router;