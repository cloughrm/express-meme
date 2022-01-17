// Run in producation with forever: npm install forever

// Dependencies
const express = require('express');
const api = require('./routes/api');
const http = require('http');
const path = require('path');

// Create app
const app = express();

// Environment vars
app.set('port', 3000);
app.set('host', 'localhost');
// app.set('host', '0.0.0.0');
app.use(express.favicon('public/favicon.ico'));
app.use(express.logger());
app.use(express.json());
app.use(express.compress());
app.use(express.urlencoded());
app.use(express.methodOverride());
app.use(app.router);
app.use(express.static(path.join(__dirname, 'public')));

// URL
app.get('/:meme/:topText?/:bottomText?', api.create);

// Run HTTP server
http.createServer(app).listen(app.get('port'), app.get('host'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});
