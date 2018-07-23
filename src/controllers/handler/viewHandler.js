const log = require('../../lib/logger');
const SUCCESS = 'success';
const dao = require('../../models/dao');

//getCurrent status of simulator
//routes.get('/currentstatus',viewHandler.currentStatus);
currentStatus = function(req,res){
    log.info('API ==>currentStatus');
    var simId = req.query.simid;
    var userId = req.query.userid;

    var statusObj = new Object();
    statusObj = {'userid':userId,'simid':simId};
    app.locals.socketClient.emit('currentstatus',statusObj);
    res.status(200).send({'status':SUCCESS,info:statusObj});   
}
module.exports.currentStatus = currentStatus;

//routes.post('/bluetooth',viewHandler.bluetooth);
blueTooth = function(req,res){
    log.info("API ==>blueTooth");
    var simId = req.body.simid;
    var userId = req.body.userid;
    var status = req.body.status;

    var statusObj = new Object();
    statusObj = {'userid':userId,'simid':simId,'status':status};
    app.locals.socketClient.emit('bt',statusObj);
    res.status(200).send({'status':SUCCESS,info:statusObj});
    //updateDB
    dao.updateDB(simId,{'accessories.bt':status},function(result){
        log.info("updated the BT status:"+JSON.stringify(result));
    }); 
}
module.exports.blueTooth = blueTooth;

//routes.post('/wifi',viewHandler.wifi);
wifi = function(req,res){
    log.info("API ==>wifi");
    var simId = req.body.simid;
    var userId = req.body.userid;
    var status = req.body.status;

    var statusObj = new Object();
    statusObj = {'userid':userId,'simid':simId,'status':status};
    app.locals.socketClient.emit('wifi',statusObj);
    res.status(200).send({'status':SUCCESS,info:statusObj});
    //updateDB
    dao.updateDB(simId,{'accessories.wifi':status},function(result){
        log.info("updated the wifi status:"+JSON.stringify(result));
    });   
}
module.exports.wifi = wifi;

//routes.post('/media',viewHandler.media);
media = function(req,res){
    log.info("API ==>media");
    var simId = req.body.simid;
    var userId = req.body.userid;
    var status = req.body.status;

    var statusObj = new Object();
    statusObj = {'userid':userId,'simid':simId,'status':status};
    app.locals.socketClient.emit('media',statusObj);
    res.status(200).send({'status':SUCCESS,info:statusObj});
    //updateDB
    dao.updateDB(simId,{'accessories.media':status},function(result){
        log.info("updated the MEDIA status:"+JSON.stringify(result));
    }); 
}
module.exports.media = media;

//routes.post('/aircondition',viewHandler.airCondition);
airCondition = function(req,res){
    log.info("API ==>airCondition");
    var simId = req.body.simid;
    var userId = req.body.userid;
    var status = req.body.status;

    var statusObj = new Object();
    statusObj = {'userid':userId,'simid':simId,'status':status};
    app.locals.socketClient.emit('ac',statusObj);
    res.status(200).send({'status':SUCCESS,info:statusObj});
    //updateDB 
    dao.updateDB(simId,{'accessories.ac':status},function(result){
        log.info("updated the AC status:"+JSON.stringify(result));
    });  
}
module.exports.airCondition = airCondition;

status = function(req,res){
    var simId = req.query.simid;
    log.info("API ==> STATUS"+simId);
    
        dao.findSim(simId,function(result){
            log.info("FIND Status "+simId+" :"+JSON.stringify(result));
            res.status(200).send(result);
        });
}
module.exports.status = status;
