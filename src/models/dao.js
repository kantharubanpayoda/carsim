const db = require('./schema');
const log = require('../lib/logger');

//updateDB
updateDB = function(simId,query,callback){
db.car.update({simid:simId},query,{upsert:true},function(err,result){
    if(err){
        log.info("DB=>update ERROR");
    }
    else{
        log.info("QUERY RESULT :"+JSON.stringify(result));
        callback(result);
    }
}) 
}
module.exports.updateDB = updateDB;

findSim = function(simId,callback){
db.car.findOne({simid:simId},function(err,result){
    if(err){
        log.info("DB=>update ERROR");
    }
    else{
        log.info("QUERY RESULT:"+JSON.stringify(result));
        callback(result);
    }
}) 
}
module.exports.findSim = findSim;