var express = require('express')
var app = express()

var bodyParser = require('body-parser');
app.use(bodyParser.json()); // support json encoded bodies
app.use(bodyParser.urlencoded({ extended: true })); // support encoded bodies


app.get('/', function (req, res) {
  res.send('Hello World!')
})

app.post('/upload/photo', function(req, res) {
    var photo_id = req.body.id;
    res.send("Post request sucessfully called with photo_id: " + photo_id);
});


app.listen(8000, function () {
  console.log('Example app listening on port 8000!')
})
