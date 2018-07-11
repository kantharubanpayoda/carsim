// KeyService.js, a key storage backed by Redis

// KeyService stores and manages user-specific keys used to sign JWTs
var redis = require('redis');
var Promise = require('bluebird');
var uuid = require('node-uuid');
var config = require('../../config/config');

//Promise.promisifyAll(redis.RedisClient.prototype);

function KeyService() {
  this.client = redis.createClient(config.redis);
  this.client.on('connect', function() {
    console.log('Redis connected.');
  });
  console.log('Connecting to Redis...');
}

KeyService.prototype.setKey = function(token,callback)
{
this.client.set(token, true, function(err, reply) {
  console.log(reply);
  callback(reply)
});
}

KeyService.prototype.getKey = function(key,callback)
{
this.client.get(key, function(err, reply) {
   // console.log(reply);
    callback(reply);
});
}

KeyService.prototype.deleteKey = function(key,callback) {
  callback(this.client.del(key));
};

module.exports = new KeyService();
