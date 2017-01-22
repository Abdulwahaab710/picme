var express = require('express')
var app = express()
var mongodb = require('mongodb');
var bodyParser = require('body-parser')
var MongoClient = mongodb.MongoClient;
var ObjectId = require('mongodb').ObjectID;

var url = 'mongodb://64.137.168.9:27017/PicMe';

app.use(bodyParser.json({limit: '50mb'}));
app.use(bodyParser.urlencoded({limit: '50mb', extended: true}));

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


// GET event given an id
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


app.get('/', function (req, res) {
  res.send('Hello World!')
})


//Endpoint to create a new event
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


//Endpoint for incrementing a vote on an image
app.put('/vote', function(req, res) {
    var id = req.body.id;

    var collection = db.collection('Submission');

    collection.find(ObjectId(id)).toArray(function (error, result) {
    	if (error) {
    		res.send(error)
    	}
    	else {
        	v = result[0].votes + 1;
    	}
        collection.update({_id: ObjectId(id)}, {$set: {'votes': v}}, function(err, event) {
            if (err) {
                res.send(err);
            }
            else {
                res.status(200);
                res.send("OK");
            }
        });
    });
})


// Endpoint for getting sorted array of submissions
app.get('/submissions/:eventID', function(req,res) {
    var eventID = req.params.eventID;
    var collection = db.collection('Submission');
    collection.find({eventID: eventID}).sort({votes:-1}).toArray(function (err, result) {
        if (err) {
            res.send(err);
        }
        else {
            res.status(200);
            res.send(result);
        }
    });
});

// Endpoint for pulling up two random submissions
app.get('/random/:id', function(req,res) {
	var id = req.params.id;

	var collection = db.collection('Submission');
	collection.find({"eventID" : id}).toArray(function (err, result) {
	  if (err) {
	    res.send(err);
	  } else if (result.length) {
	  		if (result.length < 2) {
	  			console.log("SHOULDNT HAPPEN")
	  		}
	  		else if (result.length == 2) {
	  			res.send(result);
	  		}
	  		else {
	  			len = result.length;
	  			array = [];
	  			num1 = Math.round(Math.random()*len) -1;
	  			num2 = Math.round(Math.random()*len) -1;
	  			while(num1 == num2) {
	  				num2 = Math.round(Math.random()*len) -1;
	  			}
	  			array.push(result[num1]);
	  			array.push(result[num2]);
	  			res.send(array)
	  		}
	  } else {
		res.status(404)
	  }
	});
});

app.listen(8000, function () {
  console.log('Example app listening on port 8000!')
})
