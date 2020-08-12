const redis = require("redis");
const config = require("../config/config");
const constant = require("../constants/constant");
let client;
var redisObject = {
  initiate: function (callback) {
    let self = this;
    client = redis.createClient({
      port: config.redis.port,
      host: config.redis.host,
    });

    client.on("error", function (err) {
      console.log("Error: " + err);
      self.redisStatus = false;
      callback(false);
    });

    client.on("connect", function () {
      console.log("redis is ready now");
      self.redisStatus = true;
      callback(true);
    });
  },

  redisStatus: false,

  setRedis: function (key, value) {
    var self = this;
    if (self.redisStatus) {
      client.set(key, value);
      client.expireat(
        key,
        parseInt(new Date() / 1000) + constant.redis.keyExpire
      );
      return true;
    } else {
      return false;
    }
  },

  getRedis: function (key, callback) {
    var self = this;
    if (self.redisStatus) {
      client.get(key, function (err, value) {
        if (err) {
          callback(false, err);
        } else {
          callback(true, value);
        }
      });
    } else {
      callback(false, "redisNotReady");
    }
  },
};

module.exports = redisObject;
