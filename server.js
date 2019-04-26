//require
var express = require("express");
var bodyParser = require("body-parser");
var MongoClient = require('mongodb').MongoClient;
var url = "mongodb://localhost:27017/RentACar";

//server
var app = express()

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));

//host
var server = app.listen(3000, function(){
  var host = server.address().address;
  var port = server.address().port;

  console.log("App escuchando en http://%s:%s",host,port);
})

MongoClient.connect(url,{ useNewUrlParser: true }, function(err, db) {
  if (err) throw err;
  console.log("Database created!");
  db.close();
});