require('dotenv').config();
//A config file for Intros Registrar server
var config = {};
//config.database='mongodb://127.0.0.1:27017/test';
config.database = process.env.DATABASE;
config.secret = process.env.SECRETCODE;
config.hostName = process.env.HOST_NAME;
config.redis = process.env.REDIS_URL;
config.apiLimitWindow = process.env.API_LIMIT_WINDOW;
config.apiLimitDelayAfter = process.env.API_LIMIT_DELAY_AFTER
config.apiLimitDelayMs = process.env.API_LIMIT_DELAY_MS
config.apiLimitMaxRequest = process.env.API_LIMIT_MAX_REQUEST
config.apiLimitMessage = process.env.API_LIMIT_MESSAGE
module.exports = config;