var express = require('express')
var app = express()
var mongodb = require('mongodb');
var bodyParser = require('body-parser')
var MongoClient = mongodb.MongoClient;
var ObjectId = require('mongodb').ObjectID;

var url = 'mongodb://64.137.168.9:27017/PicMe';

app.use(bodyParser())

var db;

//Make MongoDB Connection (DO NOT END: Joseph's orders!!)
MongoClient.connect(url, function (err, database) {
  if (err) {
    console.log('Unable to connect to the mongoDB server. Error:', err);
  } else {
    //HURRAY!! We are connected. :)
    console.log('Connection established to', url);
    db = database;
  }
});


// GET event
app.get('/events/:id',function(req,res) {
	var id = req.params.id;
	//console.log(id)
	var collection = db.collection('Event');
	collection.find({"_id" : ObjectId(id)}).toArray(function (err, result) {
	  if (err) {
	    res.send(err);
	  } else if (result.length) {
	    res.send(result[0]);
	    console.log("OK")
	  } else {
		res.status(404)
	  }
	});
});

var bodyParser = require('body-parser');
app.use(bodyParser.json()); // support json encoded bodies
app.use(bodyParser.urlencoded({ extended: true })); // support encoded bodies


app.get('/', function (req, res) {
  res.send('Hello World!')
})

app.post('/event', function(req, res) {
    var name = req.body.name;
    var start_time = req.body.start_time;
    var end_time = req.body.end_time;
    var description = req.body.description;

    console.log(name);

    var collection = db.collection('Event');
    collection.insert({'name': name, 'start_time': start_time, 'end_time': end_time,
        'description': description}, function(err, event) {
        // db.close();
        res.send("OK");
    });

    // res.send("Post request sucessfully called with values:" + name + start_time + end_time + description);
});

// app.post('/upload/:photo', function(req, res) {
// })

app.listen(8000, function () {
  console.log('Example app listening on port 8000!')
})
