//Registrar/authentication server
var bodyParser = require('body-parser');
var config = require('./config/config');
var passport = require('passport');
var apiRoutes = require("./src/controllers/routes");
var port = process.env.PORT || 3000;
var log = require('./src/lib/logger');
var express = require('express');
var RateLimit = require('express-rate-limit');
var localClient = require('socket.io-client');
    //global app object creation
    app = express();
var http = require('http').Server(app);
var io = require('socket.io')(http);

   // app.enable('trust proxy'); // only if you're behind a reverse proxy (Heroku, Bluemix, AWS if you use an ELB, custom Nginx setup, etc)
 
var apiLimiter = new RateLimit({
    windowMs: 60*60*1000*config.apiLimitWindow, // 1 hour window
    delayAfter: config.apiLimitDelayAfter, // begin slowing down responses after the first request
    delayMs: config.apiLimitDelayMs*1000, // slow down subsequent responses by 3 seconds per request
    max: config.apiLimitMaxRequest, // start blocking after 5 requests
    message: config.apiLimitMessage
});

var reqlog = function (req, res, next) {
    log.info('req -> '+req.method +" -> "+req.path);
    next()
    };
            
app.use(reqlog);
app.use(function (req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', '*' );
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type','X-Requested-With');
    res.setHeader('Access-Control-Allow-Credentials', true);
    next();
  });
  
// require('./src/controllers/authentication/passport')(passport);
// var authenticate = passport.authenticate('jwt', { session: false});

//app.use('/api/v1*', authenticate,proxy);

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());



http.listen(port, function(){
	log.info('Node Server listening on port$:'+port);
});

app.locals.socketClient = localClient.connect(config.hostName, {reconnect: true});
app.locals.socketClient.on("connect",function(socketDetails){
  log.info("Internal $$ API <==> SOC $$ binded");
});

require('./src/controllers/indicator/indicate')(io);

app.use('/', apiRoutes);

module.exports = app;



