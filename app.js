import path from 'path';
import logger from 'morgan';
import express from 'express';
import api from './routes/api.js';
import favicon from 'serve-favicon';
import compression from 'compression';

// Create app
const app = express();

// Environment vars
app.set('port', process.env.PORT || 3000);
app.set('host', 'localhost');

// Middleware
app.use(favicon(path.join('public', 'favicon.ico')));
app.use(logger('combined'));
app.use(compression());
app.use(express.static(path.join(process.cwd(), 'public')));

// URL
app.get('/:meme/:topText?/:bottomText?', api.create);

// Run HTTP server
app.listen(app.get('port'));
console.log(`express-meme listening at http://localhost:${app.get('port')}`);