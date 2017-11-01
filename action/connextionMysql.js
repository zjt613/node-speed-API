/**
 * 链接mysql模块
 */
// 引入mysql模块
var mysql = require('mysql');
// 导入mysql配置
var connection = mysql.createConnection(global.custom.config.mysql);
// 链接mysql
connection.connect();
module.exports.connection = connection;

