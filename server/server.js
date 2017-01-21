var express = require('express')
var app = express()
var mongodb = require('mongodb');
var bodyParser = require('body-parser')
var MongoClient = mongodb.MongoClient;

var url = 'mongodb://64.137.168.9:27017/PicMe';

app.use(bodyParser())


// var find = function(db,callback) {
// 	var collection = db.collection('Evsesent');
// 	console.log(collection)
// 	collection.find({}).toArray(function(err,docs) {
// 		console.log(docs);
// 	});
// }
// Use connect method to connect to the Server
MongoClient.connect(url, function (err, db) {
  if (err) {
    console.log('Unable to connect to the mongoDB server. Error:', err);
  } else {
    //HURRAY!! We are connected. :)
    console.log('Connection established to', url);
  }
  	console.log(db)
  	var collection = db.collection('Event');
  	console.log(collection.find());
  	console.log(collection)

    //find(db,function() { 
    //Close connection
    db.close();
});

app.get('/', function (req, res) {
  res.send('Hello World!')
})

app.listen(8000, function () {
  console.log('Example app listening on port 8000!')
})