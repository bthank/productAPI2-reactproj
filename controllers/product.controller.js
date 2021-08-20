var dbcon = require("../config/db_connection");

var connection = dbcon.getConnection();

connection.connect();

var express = require("express");

var router = express.Router();

router.get("/", (request,response)=> {
    connection.query("select * from products",(error,records,fields)=>{
        if (error) {
            console.error("Error while fetching data");
        } else {
            response.send(records);
        }
    })
})

router.get("/:id", (request,response)=> {
    connection.query("select * from products where id=" + request.params.id,(error,records,fields)=>{
        if (error) {
            console.error("Error while fetching data");
        } else {
            response.send(records);
        }
    })
})



module.exports = router;

