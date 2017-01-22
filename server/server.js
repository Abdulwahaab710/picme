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

// GET all events
app.get('/events', function(req,res) {
	var collection = db.collection('Event');
	collection.find({}).toArray(function (err, result) {
		if (err) {
		    res.send(err);
		} else if (result.length) {
		    res.send(result);
		    console.log("OK")
		} else {
			res.status(404)
		}
	});
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

    var collection = db.collection('Event');

    collection.insert({'name': name, 'start_time': start_time, 'end_time': end_time, 'description': description}, function(err, event) {
    	if (err) {
            res.send(err);
    	}
    	else {
            res.status(201);
        	res.send("OK");
    	}
    });

    // res.send("Post request sucessfully called with values:" + name + start_time + end_time + description);
});

// Endpoint for uploading Submission
app.post('/upload',function(req,res) {
	var name = req.body.name;
	//determine how the fuck to store photos
	var photo = req.body.photo;
	var description = req.body.description;
	var eventID = req.body.eventID;
	var votes = 0;

	var collection = db.collection('Submission');

	collection.insert({'name': name, 'photo':photo, 'description':description, 'eventID':eventID,'votes':votes}, function(err, event) {
		if (err) {
            res.send(err);
    	}
    	else {
            res.status(201);
        	res.send("OK");
    	}
	});
});


app.put('/vote', function(req, res) {
    votes = req.body.votes;

    var collection = db.collection('Submission');

    collection.update({'votes': votes + 1}, function(err, event) {
        if (err) {
            res.send(err);
        }
        else {
            res.status(201);
            res.send("OK");
        }
    });
    res.send()
})


// app.post('/upload/:photo', function(req, res) {
// })

app.listen(8000, function () {
  console.log('Example app listening on port 8000!')
})
