var dbcon = require("../config/db_connection");

var connection = dbcon.getConnection();

connection.connect();

var express = require("express");

var router = express.Router();

/* RETRIEVE all products -- uses get http verb */
router.get("/", (request,response)=> {
    connection.query("select * from products",(error,records,fields)=>{
        if (error) {
            console.error("Error while fetching data");
        } else {
            response.send(records);
        }
    })
})

/* RETRIEVE a single products record using id param -- uses get http verb */
router.get("/:id", (request,response)=> {
    connection.query("select * from products where id=" + request.params.id,(error,records,fields)=>{
        if (error) {
            console.error("Error while fetching data");
        } else {
            response.send(records);
        }
    })
})

/* CREATE a products record using an insert query -- uses post http verb */
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


/* UPDATE a products record -- uses put http verb */
router.put("/", (request,response)=> {
    var id = request.body.id;
    var name = request.body.name;
    var description = request.body.description;
    var price = request.body.price;

    console.log("update products set name='"+name+"', description='"+description+"', price="+price+" where id=" + id);
    connection.query("update products set name='"+name+"', description='"+description+"', price="+price+" where id=" + id,(error,result)=>{
        if (error) {
            console.error("Error while updating data: " + error);
        } else {
            response.send({update:"success"});
        }
    })
})

/* DELETE a single products record using id param -- uses delete http verb */
router.delete("/:id", (request,response)=> {
    console.log("delete from products where id=" + request.params.id);
    connection.query("delete from products where id=" + request.params.id,(error,records,fields)=>{
        if (error) {
            console.error("Error while deleting data");
        } else {
            response.send({delete:"Success"});
        }
    })
})




module.exports = router;

