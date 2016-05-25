var express = require("express");
var HttpStatus = require('http-status-codes');
var app = express();
 
app.get("/", function(req, res) {
    res.sendFile( __dirname + "/" + "index.html" );
});

var server = app.listen(8080, function () {
    console.log("Sua app rodando na porta %s...", server.address().port);
});
