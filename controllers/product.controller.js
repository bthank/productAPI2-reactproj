var dbcon = require("../config/db_connection");

var connection = dbcon.getConnection();

connection.connect();

var express = require("express");

var router = express.Router();

/* retrieve all products */
router.get("/", (request,response)=> {
    connection.query("select * from products",(error,records,fields)=>{
        if (error) {
            console.error("Error while fetching data");
        } else {
            response.send(records);
        }
    })
})

/* retrieve a single products record using id param */
router.get("/:id", (request,response)=> {
    connection.query("select * from products where id=" + request.params.id,(error,records,fields)=>{
        if (error) {
            console.error("Error while fetching data");
        } else {
            response.send(records);
        }
    })
})

/* create a products record using an insert query*/
router.post("/", (request,response)=> {
    var id = request.body.id;
    var name = request.body.name;
    var description = request.body.description;
    var price = request.body.price;
    console.log("insert into products values("+id+",'"+name+"','"+description+"',"+price+")");
    connection.query("insert into products values("+id+",'"+name+"','"+description+"',"+price+")",(error,result)=>{
        if (error) {
            console.error("Error while inserting data " + error);
        } else {
            response.send({insert:"success"});
        }
    })
})

module.exports = router;

