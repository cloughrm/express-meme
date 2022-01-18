// Dependencies
const express = require('express');
const api = require('./routes/api');
const path = require('path');
const favicon = require('serve-favicon');
const compression = require('compression');
const logger = require('morgan');

// Create app
const app = express();

// Environment vars
app.set('port', process.env.PORT || 3000);
app.set('host', 'localhost');

// Middleware
app.use(favicon(path.join('public', 'favicon.ico')));
app.use(logger('combined'));
app.use(compression());
app.use(express.static(path.join(__dirname, 'public')));

// URL
app.get('/:meme/:topText?/:bottomText?', api.create);

// Run HTTP server
app.listen(app.get('port'));
console.log(`express-meme listening at http://localhost:${app.get('port')}`);