const routes = require('express').Router();
const viewHandler = require('./handler/viewHandler');
const simHandler = require('./handler/simHandler');

//View API's 
routes.post('/bluetooth',viewHandler.blueTooth);
routes.post('/wifi',viewHandler.wifi);
routes.post('/radio',viewHandler.media);
routes.post('/lock',viewHandler.lock);
routes.get('/currentstatus',viewHandler.currentStatus);

//Simulator API's
routes.post('/enginestatus',simHandler.engineStatus);
routes.post('/lampstatus',simHandler.lampStatus);
routes.post('/runningstatus',simHandler.runningStatus);
routes.post('/accessoriesstatus',simHandler.accessoriesStatus);
routes.post('/simulatorstatus',simHandler.simStatus);

module.exports = routes;
