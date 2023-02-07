const xss = require('xss');
const { exec } = require('../db/mysql');

const getList = (author, keyword) => {
  let sql = `SELECT * FROM blogs WHERE 1=1 `;
  if (author) {
    sql += `AND author='${author}' `;
  }
  if (keyword) {
    sql += `AND title LIKE '%${keyword}%' `;
  }
  sql += `ORDER BY createtime DESC`;

  return exec(sql);
};

const getDetail = (id) => {
  const sql = `SELECT * FROM blogs WHERE id='${id}'`;
  return exec(sql).then((rows) => {
    return rows[0];
  });
};

const newBlog = (blogData = {}) => {
  const title = xss(blogData.title);
  const content = xss(blogData.content);
  const author = blogData.author;
  const createTime = Date.now();

  let sql = `INSERT INTO blogs(\`title\`,\`content\`,\`createtime\`,\`author\`) VALUES('${title}','${content}',${createTime},'${author}')`;

  return exec(sql).then((insertData) => {});
};

const updateBlog = (id, blogData = {}) => {
  const title = xss(blogData.title);
  const content = xss(blogData.content);

  const sql = `UPDATE blogs SET title='${title}',content='${content}' WHERE id=${id}`;

  return exec(sql).then((updateData) => {
    if (updateData.affectedRows > 0) {
      return true;
    }
    return false;
  });
};

const delBlog = (id, author) => {
  const sql = `DELETE FROM blogs WHERE id=${id} AND author='${author}'`;

  return exec(sql).then((delData) => {
    if (delData.affectedRows > 0) {
      return true;
    }
    return false;
  });
};

module.exports = {
  getList,
  getDetail,
  newBlog,
  updateBlog,
  delBlog
};
