// Run in producation with forever: npm install forever

/**
 * Module dependencies.
 */

var express = require('express');
var routes = require('./routes');
var api = require('./routes/api');
var http = require('http');
var path = require('path');
var Canvas = require('canvas');

var app = express();

// all environments
app.set('port', 3000);
app.use(express.favicon('public/favicon.ico'));
app.use(express.logger());
app.use(express.json());
app.use(express.compress());
app.use(express.urlencoded());
app.use(express.methodOverride());
app.use(app.router);
app.use(express.static(path.join(__dirname, 'public')));

app.get('/:meme/:topText?/:bottomText?', api.create);

http.createServer(app).listen(app.get('port'), 'localhost', function(){
  console.log('Express server listening on port ' + app.get('port'));
});
