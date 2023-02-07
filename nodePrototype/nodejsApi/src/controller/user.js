const { exec, escape } = require('../db/mysql');
const { genPassword } = require('../utils/cryp');

const login = (username, password) => {
  username = escape(username);
  

  // 生成加密密码
  password = genPassword(password);
  password = escape(password);

  // sql语句经过escape之后不需要添加单引号
  const sql = `SELECT username,realname FROM users WHERE username=${username} AND password=${password}`;

  return exec(sql).then((rows) => {
    return rows[0] || {};
  });
};

module.exports = {
  login
};
