const redis = require('redis');
const { REDIS_CONF } = require('../conf/db');

const redisClient = redis.createClient(REDIS_CONF.port, REDIS_CONF.host);
redisClient.on('error', (err) => {
  console.log(err);
});

function set(key, val) {
  // 为redis对象数据做一下兼容
  if (typeof val === 'object') {
    val = JSON.stringify(val);
  }
  redisClient.set(key, val, redis.print);
}

function get(key) {
  const promise = new Promise((resolve, reject) => {
    redisClient.get(key, (err, val) => {
      if (err) {
        reject(err);
        return;
      }
      if (val == null) {
        resolve(null);
        return;
      }
      try {
        resolve(JSON.parse(val));
      } catch (x) {
        resolve(val);
      }
    });
  });
  return promise;
}

module.exports = {
  set,
  get
};