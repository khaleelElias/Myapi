var express = require('express');
var router = express.Router();

const db = require("../db/db")

router.get("/", function(req, res, next) {
    const id = req.query.ids || null
    const columnId = req.query.columnId || null
    console.log("id: ", id)
    if(id != null && id != "")  {
        console.log("id")
        db.getOrderById(id, function(error, order)  {
            if(error)  
                res.status(500).json({ error })
            else
                res.status(200).json({ order })
        })
    }   else if(columnId != null && columnId != "" )    {
        console.log("columnId")
        db.getOrderByColumnId(columnId, function(error, orders) {
            if(error)
                res.status(500).json({ error })
            else
                res.status(200).json({ orders })
        })
    }   else    {
        console.log("all")

        db.getAllOrders(function(error, orders) {
            console.log("orders: ", orders)
            if(error)
                res.status(500).json({ error })
            else
                res.status(200).json({ orders })           
        })
    }
})

router.post("/", function(req, res, next)   {
    const title = req.body.title;
    const company = req.body.company
    const date = req.body.date
    const status = req.body.status
    const columnId = req.body.columnId

    db.createOrder(title, company, date, status, columnId, function(error)  {
        if(error)
            res.status(500).json({ error })
        else
            res.status(200).json({ message: "Created successfully!" })
    })
})

router.put("/", function(req, res, next)    {
    const id = req.body.id
    const title = req.body.title;
    const company = req.body.company
    const date = req.body.date
    const status = req.body.status
    const columnId = req.body.columnId

    if(id != null || id != "")  {
        db.updateOrder(id, title, company, date, status, columnId, function(error)  {
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

    if(id != null || id != "")  {
        db.deleteOrder(id, function(error)  {
            if(error)
                res.status(500).json({ error })
            else
                res.status(200).json({ message: "Deleted successfully!" })
        })
    }   else
        res.status(400).json({ message: "NO ID!" })
})

module.exports = router;