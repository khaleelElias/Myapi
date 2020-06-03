var express = require('express');
var router = express.Router();

const db = require("../db/db")

router.get("/", function(req, res, next) {
    const id = req.query.ids || null
    const priority = req.query.priority || null

    if(id != null && id != "")  {
        db.getProjectById(id, function(error, project)  {
            if(error)
                res.status(500).json({ error })
            else
                res.status(200).json({ project })
        })
    }   else if(priority != null && priority != "")    {
         db.getAllProjectsFilteredByPriorty( function( error, projects) {
             console.log("error: ", error, " projects: ", projects)
            if(error)
                res.status(500).json({ error })
            else
                res.status(200).json({ projects })
        })
    }   else    {
        db.getAllProjects(function(error, projects) {
            if(error)
                res.status(500).json({ error })
            else
                res.status(200).json({ projects })           
        })
    }
})


router.post("/", function(req, res, next)   {
    const projectNumber = req.body.projectNumber;
    const company = req.body.company
    const date = req.body.date
    const status = req.body.status
    const priority = req.body.priority
    const message = req.body.message

    console.log("created project with values: ", projectNumber, company, date, status, message )

    db.createProject(projectNumber, company, date, status, priority, message, function(error)  {
        if(error)
            res.status(500).json({ error })
        else
            res.status(200).json({ message: "Created successfully!" })
    })
})

router.put("/", function(req, res, next)    {
    const id = req.body.id
    const projectNumber = req.body.projectNumber;
    const company = req.body.company
    const date = req.body.date
    const status = req.body.status
    const priority = req.body.priority

    if(id != null || id != "")  {
        db.updateProject(id, projectNumber, company, date, status, priority, message, function(error)  {
            if(error)
                res.status(500).json({ error })
            else
                res.status(200).json({ message: "Updated successfully!" })
        })
    }   else    
        res.status(400).json({ message: "NO ID!" })
})

router.delete("/", function(req, res, next) {
    const id = req.body.id

    if(id != null && id != "")  {
        db.deleteProject(id, function(error)  {
            if(error)
                res.status(500).json({ error })
            else
                res.status(200).json({ message: "Deleted successfully!" })
        })
    }   else
        res.status(400).json({ message: "NO ID!" })
})

router.put("/status/", function(req, res, next)  {
    const id = req.body.id
    const status = req.body.status

    if(id != null)  {
        db.updateProjectStatus(id, status, function(error)    {
            if(error)
                res.status(500).json({ error })
            else
                res.status(200).json({ message: "Updated successfully!" })
        })
    }   else
        res.status(400).json({ message: "NO ID!" })
})

router.put('/priority', function(req, res, next)  {
    const id = req.body.id
    const priority = req.body.priority

    if(id != null)  {
        db.updateProjectPriority(id, priority, function(error)    {
            if(error)
                res.status(500).json({ error })
            else
                res.status(200).json({ message: "Updated successfully!" })
        })
    }   else
        res.status(400).json({ message: "NO ID!" })
})


module.exports = router;