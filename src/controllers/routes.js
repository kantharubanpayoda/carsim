const routes = require('express').Router();
const viewHandler = require('./handler/viewHandler');
const simHandler = require('./handler/simHandler');
const launch = require('./handler/launch');
const path = require('path');

//route for assets
routes.get('/assets/:file', function(req, res) {
    res.sendFile(path.join(app.locals.rootDir + '/assets/'+req.params.file));
  });
  routes.get('/assets/:dir/:file', function(req, res) {
    res.sendFile(path.join(app.locals.rootDir + '/assets/'+req.params.dir+'/'+req.params.file));
  });
  routes.get('/assets/:dir/:sub_dir/:file', function(req, res) {
    res.sendFile(path.join(app.locals.rootDir + '/assets/'+req.params.dir+'/'+req.params.sub_dir+'/'+req.params.file));
  });
  routes.get('/assets/:assets/:dir/:sub_dir/:file', function(req, res) {
    res.sendFile(path.join(app.locals.rootDir + '/assets/'+req.params.assets+'/'+req.params.dir+'/'+req.params.sub_dir+'/'+req.params.file));
  });
  routes.get('/assets/:assets/:dir/:sub_dir/:category/:file', function(req, res) {
    res.sendFile(path.join(app.locals.rootDir + '/assets/'+req.params.assets+'/'+req.params.dir+'/'+req.params.sub_dir+'/'+req.params.category+'/'+req.params.file));
  });
  routes.get('/assets/:assets/:dir/:sub_dir/:category/:extension/:file', function(req, res) {
    res.sendFile(path.join(app.locals.rootDir + '/assets/'+req.params.assets+'/'+req.params.dir+'/'+req.params.sub_dir+'/'+req.params.category+'/'+req.params.extension+'/'+req.params.file));
  });

//Launch app's
routes.get('/simulator',launch.simulator);
routes.get('/cockpit',launch.cockpit);

//View API's 
routes.post('/bluetooth',viewHandler.blueTooth);
routes.post('/wifi',viewHandler.wifi);
routes.post('/media',viewHandler.media);
routes.post('/aircondition',viewHandler.airCondition);
routes.get('/currentstatus',viewHandler.currentStatus);

//Simulator API's
routes.post('/enginestatus',simHandler.engineStatus);
routes.post('/lampstatus',simHandler.lampStatus);
routes.post('/runningstatus',simHandler.runningStatus);
routes.post('/accessoriesstatus',simHandler.accessoriesStatus);
routes.post('/simulatorstatus',simHandler.simStatus);
routes.post('/handbrake',simHandler.handBrake);
routes.post('/indicator',simHandler.indicator);

module.exports = routes;
