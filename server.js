var express = require("express");
var bodyparser = require("body-parser");
var cors = require("cors");

var app = express();

app.use(bodyparser.json());
app.use(bodyparser.urlencoded({extended:false}));
app.use(cors());

var productAPI2 = require("./controllers/product.controller");

app.use("/api/products",productAPI2);

app.listen(8080);
console.log("Server up and running on port 8080");
