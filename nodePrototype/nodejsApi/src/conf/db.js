// 根据env的类型切换数据库
const env = process.env.NODE_ENV;

let MYSQL_CONF;
let REDIS_CONF;

if (env === 'dev') {
  MYSQL_CONF = {
    host: 'localhost',
    user: 'root',
    password: '330601',
    port: '3306',
    database: 'myblog'
  };

  REDIS_CONF = {
    prot: 6379,
    host: '127.0.0.1'
  };
}

if (env === 'production') {
  MYSQL_CONF = {
    host: 'localhost',
    user: 'root',
    password: '330601',
    port: '3306',
    database: 'myblog'
  };

  REDIS_CONF = {
    prot: 6379,
    host: '127.0.0.1'
  };
}

module.exports = {
  MYSQL_CONF,
  REDIS_CONF
};
