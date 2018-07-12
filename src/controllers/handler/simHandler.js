const log = require('../../lib/logger');
const SUCCESS = 'success';

//router.post('/simulatorstatus',simHandler.simStatus);
simStatus = function(req,res){
    log.info("API ==>simStatus");
    var simId = req.body.simid;
    var userId = req.body.userid;
    var details = req.body.details; //{engine:ON/OFF,lamp:ON/OFF,speed:range,accessories:{wifi:ON/OFF,bt:ON/OFF,media:ON/OFF}}

    var statusObj = new Object();
    statusObj = {'userid':userId,'simid':simId,'details':details};
    log.info("simStatus :"+JSON.stringify(details));
    app.locals.socketClient.emit('simstatus',statusObj);
    res.status(200).send({'status':SUCCESS,info:statusObj});   
}
module.exports.simStatus = simStatus;

//router.post('/enginestatus',simHandler.engineStatus);
engineStatus = function(req,res){
    log.info("API ==>engineStatus");
    var simId = req.body.simid;
    var userId = req.body.userid;
    var status = req.body.status;

    var statusObj = new Object();
    statusObj = {'userid':userId,'simid':simId,'status':status};
    app.locals.socketClient.emit('engine',statusObj);
    res.status(200).send({'status':SUCCESS,info:statusObj});   
}
module.exports.engineStatus = engineStatus;

//router.post('/lampstatus',simHandler.lampStaus);
lampStatus = function(req,res){
    log.info("API ==>lampStatus");   
    var simId = req.body.simid;
    var userId = req.body.userid;
    var status = req.body.status;

    var statusObj = new Object();
    statusObj = {'userid':userId,'simid':simId,'status':status};
    app.locals.socketClient.emit('lamp',statusObj);   
    res.status(200).send({'status':SUCCESS,info:statusObj});   
}
module.exports.lampStatus = lampStatus;


//router.post('/runningstatus',simHandler.runningStatus);
runningStatus = function(req,res){
    log.info("API ==>runningStatus");
    var simId = req.body.simid;
    var userId = req.body.userid;
    var range = req.body.range;

    var statusObj = new Object();
    statusObj = {'userid':userId,'simid':simId,'range':range};
    app.locals.socketClient.emit('speed',statusObj); 
    res.status(200).send({'status':SUCCESS,info:statusObj});     
}
module.exports.runningStatus = runningStatus;


//router.post('/accessoriesstatus',simHandler.accessoriesStatus);
accessoriesStatus = function(req,res){
    log.info("API ==>accessoriesStatus");
    var simId = req.body.simid;
    var userId = req.body.userid;
    var accessories = req.body.accessories; //{wifi:ON/OFF,bt:ON/OFF,media:ON/OFF}
    
    var statusObj = new Object();
    statusObj = {'userid':userId,'simid':simId,'accessories':accessories};
    app.locals.socketClient.emit('accessories',statusObj);   
    res.status(200).send({'status':SUCCESS,info:statusObj});   
}
module.exports.accessoriesStatus = accessoriesStatus;

//routes.post('/handbrake',simHandler.handBrake);
handBrake = function(req,res){
    log.info("API ==>handBrake");   
    var simId = req.body.simid;
    var userId = req.body.userid;
    var status = req.body.status;

    var statusObj = new Object();
    statusObj = {'userid':userId,'simid':simId,'status':status};
    app.locals.socketClient.emit('hb',statusObj);   
    res.status(200).send({'status':SUCCESS,info:statusObj});   
}
module.exports.handBrake = handBrake;

//routes.post('/indicator',simHandler.indicator);
indicator = function(req,res){
    log.info("API ==>indicator");   
    var simId = req.body.simid;
    var userId = req.body.userid;
    var details = req.body.details;//{left:ON/OFF,right:ON/OFF}

    var statusObj = new Object();
    statusObj = {'userid':userId,'simid':simId,'details':details};
    app.locals.socketClient.emit('indicator',statusObj);   
    res.status(200).send({'status':SUCCESS,info:statusObj});   
}
module.exports.indicator = indicator;
