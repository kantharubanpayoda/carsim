const routes = require('express').Router();
const viewHandler = require('./handler/viewHandler');
const simHandler = require('./handler/simHandler');

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
