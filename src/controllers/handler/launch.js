const log = require('../../lib/logger');
const fs = require('fs');
const SUCCESS = 'success';

simulator = function(req,res)
{
    log.info("Launch simulator");
    fs.readFile(app.locals.rootDir+'/public/simulator.html',function(error, data){
        if (error) {
          res.writeHead(404);
          res.write('Contents you are looking for-not found');
          res.end();
        }  else {
          res.writeHead(200, {
            'Content-Type': 'text/html'
          });
          res.write(data.toString());
          res.end();
        }
      });
}
module.exports.simulator = simulator;


cockpit = function(req,res){
    log.info("Launch cockpit");
    fs.readFile(app.locals.rootDir+'/public/cockpit.html',function(error, data){
        if (error) {
          res.writeHead(404);
          res.write('Contents you are looking for-not found');
          res.end();
        }  else {
          res.writeHead(200, {
            'Content-Type': 'text/html'
          });
          res.write(data.toString());
          res.end();
        }
      });
}
module.exports.cockpit = cockpit;
