var express = require("express");

var app = express();

var productAPI2 = require("./controllers/product.controller");

app.use("/api/products",productAPI2);

app.listen(8080);
console.log("Server up and running on port 8080");
