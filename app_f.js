const forever = require("forever-monitor")
  , path = require('path')
  ;

const debugMode = process.argv.includes('--inspect') ? true : false;
const command = debugMode ? 'node --inspect' : 'node';

const child = new (forever.Monitor)(path.join(__dirname, 'app.js'), {
  'silent': false,
  'max': 1,
  'watch': true,
  'watchDirectory': __dirname,
  'watchIgnorePatterns': [ path.join(__dirname, 'logs/*')],
  'logFile': path.join(__dirname, 'logs', 'logfile'),
  'errFile': path.join(__dirname, 'logs', 'errfile'),
  'command': command,
});

child.on('exit', function(){
  console.log('app.js has exited after ' + child.max + ' restarts');
});

process.env.NODE_ENV = 'production'; // start the app in production mode

/* PORT is set to 4000 for local development server
 * Production server does not use this file (app_f.js)
 * and so the defaultPort variable (in app.js) will be used to
 * set the port in the production environment
 */
process.env.PORT = 2000;


child.start();