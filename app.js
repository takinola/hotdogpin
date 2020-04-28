/*
 * Project starting point
 */

'use strict';

const express = require('express')
  , path = require('path')
  , http = require('http')
  , favicon = require('serve-favicon')
  , compression = require('compression')
  , session = require('express-session')
  , cookieParser = require('cookie-parser')
  , bodyParser = require('body-parser')
  , methodOverride = require('method-override')
  , morgan = require('morgan')
  , process = require('process')
  , hotdog = require(path.join(__dirname, 'lib', 'hotdog'))
  ;

const defaultEnvironment = 'production'; // start the app in production mode
const defaultPort = 2000;

let app = express();
app.enable('trust proxy');
app.use(compression())     // gzips responses
app.use(morgan('dev'))     // use morgan logger
app.use(cookieParser());   // set up cookie parser
app.use(bodyParser.urlencoded({extended: false, limit: '50mb'}));  // enable access to req.body in forms
app.use(bodyParser.json({limit: '50mb'}));   // enable access to req.body in forms
app.use(methodOverride());   // determine method of requests (e.g. 'GET', 'POST', etc)
app.disable("x-powered-by"); // disable x-powered-by header 
app.set('port', process.env.PORT || defaultPort);  // set port to value in environment
app.set('environment', process.env.NODE_ENV || defaultEnvironment);      // set environment to value in environment
app.set('view engine', 'pug');
app.use(favicon(path.join(__dirname, 'public', 'img', 'favicon.ico')));  // set favicon

const routes = require(path.join(__dirname, 'routes'))(app);  // set routes

app.use(express.static(path.join(__dirname, 'public')));  // set public directory


/* handle 404 errors
 * NOTE: This should be the last app.use
 */
app.use(function(req, res, next){
  res.redirect('/notfound?referral=' + encodeURIComponent(req.originalUrl));
  return;
});


http.createServer(app).listen(app.get('port'), function(){
  hotdog.initialize(app)
  .then(()=>{
console.log('Express server listening on port ' + app.get('port'));
  })
  .catch((err)=>{
console.log('error initializing project....\n', err);
  })
});



