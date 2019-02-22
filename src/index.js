//Load express module with `require` directive
var express = require('express');
var app = express();
var redis = require('redis');
var client = redis.createClient('6379', 'redis');

//Define request response in root URL (/)
app.get('/', function (req, res) {
    client.incr('counter', function(err, counter) {
        if(err) return next(err);
        res.send('This page has been viewed ' + counter + ' times!');
    });
})

//Launch listening server on port 8081
app.listen(8081, function () {
  console.log('app listening on port 8081!')
})

client.on('connect', function() {
    console.log('Redis connected');
});
