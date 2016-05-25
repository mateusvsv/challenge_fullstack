var express = require("express");
var bodyParser = require('body-parser');
var HttpStatus = require('http-status-codes');
var removeDiacritics = require('diacritics').remove;
var path = require('path')
var app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));


app.get("/", function(req, res) {
    res.sendFile( __dirname + "/" + "index.html" );
});

app.post('/palindromo', function (req, res) {
    var frase = req.body.frase;
    palindromo = isPalindrome(frase);
    if (palindromo){
        res.status(HttpStatus.OK);
        res.sendFile( __dirname + "/" + "resposta.html" );
    }
    else{
        res.status(HttpStatus.BAD_REQUEST);
        res.sendFile( __dirname + "/" + "erro.html" );
    }
});

function isPalindrome(frase){
    var palindroma = true;
    frase = formataFrase(frase);
    meio_frase = frase.length/2;
    for(var i = 0; i < meio_frase; i++){
        if(frase.charAt(i) != frase.charAt(frase.length - i - 1))
            palindroma = false;
    }
    return palindroma;
}

function formataFrase(frase){
    frase = frase.toUpperCase();
    frase = frase.replace(/ /g,'');
    frase = removeDiacritics(frase);
    return frase;
}

var server = app.listen(8080, function () {
    console.log("Sua app rodando na porta %s...", server.address().port);
});
