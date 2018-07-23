// var logger = require('winston');
// logger.setLevels({debug:0,info: 1,silly:2,warn: 3,error:4,});
// //logger.addColors({debug: 'green',info:  'cyan',silly: 'magenta',warn:  'yellow',error: 'red'});
// logger.add(logger.transports.File, {filename:'../log/logfile.log', json: true });
// module.exports = logger;
var winston = require('winston');
var MongoDB = require('winston-mongodb');
var config = require('../../config/config');
require('winston-daily-rotate-file');   

// TR: console'da sadece hepsi tutuluyor olacak çünkü info log seviyesinden sonra diğer tüm log seviyeleri sıralanmış
// EN: all log level will be shown in Console, because 'info' is on the top of list with 0 value.
var transportConsole = new winston.transports.Console({ json: false, timestamp: true, prettyPrint:true, colorize: true, level:'info' }),

// TR: File'da sadece i ve db tutuluyor olacak çünkü i den sonra db log seviyesi sıralanmış
// EN: 'i' and 'db' log levels will be shown in File, because db is after i and for File transport level is 'i'
//transportFileDebug = new winston.transports.File({ filename:__dirname+'/logs/debug-%DATE%.log', json: true }),
transportFileException = new winston.transports.File({ filename:__dirname+'/logs/exceptions.log', json: false });

var transportr = new (winston.transports.DailyRotateFile)({
    filename: __dirname+'/logs/debug-%DATE%.log',
    datePattern: 'YYYY-MM-DD-HH-MM',
    zippedArchive: true,
    maxSize: '1000m',
    maxFiles: '14d'
  });
/*transportMongoDB = new winston.transports.MongoDB({
            db : config.dbHost+'/'+config.dbName,
            collection: 'logs'
        });*/

// TR: rediste sadece db tutuluyor olacak çünkü db den sonra bir log seviyesi yok
// EN: only 'db' will be stored in rediste because 'db' is the last one 

var logger = winston.createLogger({
    levels: {
        info: 0,
        warn: 1,
        error: 2,
        verbose: 3,
        i: 4,
        db: 5
    },
    // dailyRotateFile: {
    //   colorize: 'true',
    //   filename: __dirname+'/debug.log',
    //   datePattern: '.yyyy-MM-dd',
    //   maxsize: 20000
    // },
    transports: [
        transportConsole,
        //transportFileDebug,
        transportr
       // transportMongoDB
    ],
    exceptionHandlers: [
        transportConsole,
        transportFileException
      //  transportMongoDB
    ],
    exitOnError: false
});

winston.addColors({
    info: 'green',
    warn: 'cyan',
    error: 'red',
    verbose: 'blue',
    i: 'gray',
    db: 'magenta'
});

logger.i('iiiii foobar level-ed message');
logger.db('dbbbbb foobar level-ed message');
logger.info('infoo foobar level-ed message');
logger.warn('warnnnn foobar level-ed message');
logger.error('errroor foobar level-ed message');

module.exports = logger;