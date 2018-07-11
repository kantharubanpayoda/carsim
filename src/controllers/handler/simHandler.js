const log = require('../../lib/logger');
const SUCCESS = 'success';

//router.post('/simulatorstatus',simHandler.simStatus);
simStatus = function(req,res){
    log.info("simStatus");
    var simId = req.body.simid;
    var userId = req.body.userid;
    var details = req.body.details; //{engine:ON/OFF,lamp:ON/OFF,speed:range,accessories:{wifi:ON/OFF,bt:ON/OFF,media:ON/OFF}}

    var statusObj = new Object();
    statusObj = {'userid':userId,'simid':simId,'details':details};
    app.locals.socketClient.emit('simstatus',statusObj);
    res.status(200).send({'status':SUCCESS,info:statusObj});   
}
module.exports.simStatus = simStatus;

//router.post('/enginestatus',simHandler.engineStatus);
engineStatus = function(req,res){
    log.info("engineStatus");
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
    log.info("lampStatus");   
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
    log.info("runningStatus");
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
    log.info("accessoriesStatus");
    var simId = req.body.simid;
    var userId = req.body.userid;
    var accessories = req.body.accessories; //{wifi:ON/OFF,bt:ON/OFF,media:ON/OFF}
    
    var statusObj = new Object();
    statusObj = {'userid':userId,'simid':simId,'accessories':accessories};
    app.locals.socketClient.emit('accessories',statusObj);   
    res.status(200).send({'status':SUCCESS,info:statusObj});   
}
module.exports.accessoriesStatus = accessoriesStatus;
