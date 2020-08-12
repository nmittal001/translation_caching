const translate = require("@vitalets/google-translate-api");
const redis = require("../lib/redis");
const failJson = { success: 0, message: "There was an error!" };
const constant = require("../constants/constant");
redis.initiate(function (status) {});

let translation = {
  async getTranslationModule(query, callback) {
    try {
      let { source, target, text } = query;
      let redisKey = `${source}_${target}_${text}`;
      let result = await getTranslation(query, redisKey);
      callback(result[0], result[1]);
    } catch (err) {
      console.log("Error: ", err);
      callback(failJson, false);
    }
  },
  async saveAllLanguageTranslationInRedis(query) {
    try {
      let { source, target, text } = query;
      let langs = constant.languages;
      let redisKey;
      let langsLen = langs.length;
      for (let i = 0; i < langsLen; i++) {
        if (source != langs[i] && target != langs[i]) {
          redisKey = `${source}_${langs[i]}_${text}`;
          query.target = langs[i];
          await getTranslation(query, redisKey);
        }
      }
    } catch (err) {
      console.log("Error: ", err);
    }
  },
};

let getTranslation = function (query, redisKey) {
  return new Promise(async (resolve, reject) => {
    try {
      let getDataFromRedis = await getFromRedis(redisKey);
      if (!getDataFromRedis.isPresent) {
        translate(query.text, { from: query.source, to: query.target })
          .then((res) => {
            if (redis.redisStatus) {
              console.log("Set in DB", res.text);
              redis.setRedis(redisKey, res.text);
            }
            resolve([{ success: 1, data: res.text }, false]);
          })
          .catch((err) => {
            console.log("Error: ", err);
            resolve([failJson, true]);
          });
      } else {
        resolve([{ success: 1, data: getDataFromRedis.result }, true]);
      }
    } catch (err) {
      console.log("Error: ", err);
      resolve([failJson, true]);
    }
  });
};

let getFromRedis = function (redisKey) {
  return new Promise((resolve, reject) => {
    redis.getRedis(redisKey, function (err, result) {
      if (!err) {
        resolve({ isPresent: false, result: "" });
      } else {
        if (result) {
          console.log("from redis");
          resolve({ isPresent: true, result: result });
        } else {
          resolve({ isPresent: false, result: "" });
        }
      }
    });
  });
};

module.exports = translation;
