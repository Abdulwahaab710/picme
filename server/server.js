var express = require('express')
var app = express()
var mongodb = require('mongodb');
var bodyParser = require('body-parser')
var MongoClient = mongodb.MongoClient;

var url = 'mongodb://64.137.168.9:27017/PicMe';

app.use(bodyParser())

//Make MongoDB Connection (DO NOT END: Joseph's orders!!)
MongoClient.connect(url, function (err, db) {
  if (err) {
    console.log('Unable to connect to the mongoDB server. Error:', err);
  } else {
    //HURRAY!! We are connected. :)
    console.log('Connection established to', url);
  }
});
// var find = function(db,callback) {
// 	var collection = db.collection('Evsesent');
// 	console.log(collection)
// 	collection.find({}).toArray(function(err,docs) {
// 		console.log(docs);
// 	});
// }
// Use connect method to connect to the Server

// Get the documents collection
var collection = db.collection('Event');

// EndPoints
collection.find({}).toArray(function (err, result) {
  if (err) {
    console.log(err);
  } else if (result.length) {
    console.log('Found:', result);
  } else {
    console.log('No document(s) found with defined "find" criteria!');
  }
});

app.get('/', function (req, res) {
  res.send('Hello World!')
})

app.listen(8000, function () {
  console.log('Example app listening on port 8000!')
})